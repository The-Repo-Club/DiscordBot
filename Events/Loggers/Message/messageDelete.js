// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Message/messageDelete.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, Message } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "messageDelete",
	/**
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot) return;
		// We're going to ignore all messages that are sent by the bot
		const Data = await DB.findOne({
			GuildID: message.guild.id,
		});
		if (!Data) return;

		const logsChannel = message.guild.channels.cache.get(Data.Logs);
		const logs = await message.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry

		const messageContent =
			message.content.slice(0, 1500) +
			(message.content.length > 1500 ? " ..." : "");

		const messageDeletedEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("A Message Has Been Deleted")
			.setDescription(
				`📘 A message by ${message.author} in ${message.channel} was **deleted** by <@${log.executor.id}>.`
			)
			.setTimestamp()
			.addField("Message", messageContent)
			.setFooter({
				text: `Member: ${message.author.tag} | ID: ${message.author.id}`,
				iconURL: `${message.author.avatarURL({ dynamic: true, size: 512 })}`,
			});

		logsChannel
			.send({ embeds: [messageDeletedEmbed] })
			.catch((err) => console.log(err));
	},
};
