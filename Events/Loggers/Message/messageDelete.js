// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Message/messageDelete.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, Message } = require("discord.js");
const DB = require("../../../Structures/Schemas/channelsDB"); //Make sure this path is correct

module.exports = {
	name: "messageDelete",
	path: "Message/messageDelete.js",
	/**
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot) return;
		// We're going to ignore all messages that are sent by the bot
		const Data = await DB.findOne({
			GuildID: message.guild.id,
		});
		if (!Data || !Data.logs.messageLogs) return;

		const logsChannel = message.guild.channels.cache.get(Data.logs.messageLogs);
		const logs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_DELETE",
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry

		if (!log)
			return console.log(
				`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`
			);

		const messageContent =
			message.content.slice(0, 1000) +
			(message.content.length > 1000 ? " ..." : ".");

		const { executor, target } = log;

		const messageDeletedEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("A Message Has Been Deleted")
			.setTimestamp()
			.addField("Message", messageContent)
			.setFooter({
				text: `Member: ${message.author.tag} | ID: ${message.author.id}`,
				iconURL: `${message.author.avatarURL({ dynamic: true, size: 512 })}`,
			});
		if (target.id === message.author.id) {
			messageDeletedEmbed.setDescription(
				`📘 A message by ${message.author} in ${message.channel} was **deleted** by <@${executor.id}>.`
			);
		} else {
			messageDeletedEmbed.setDescription(
				`📘 A message by ${message.author} in ${message.channel} was **deleted**, audit log fetch was inconclusive.`
			);
		}

		logsChannel
			.send({ embeds: [messageDeletedEmbed] })
			.catch((err) => console.log(err));
	},
};
