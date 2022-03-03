// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Message/messageUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, Message } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "messageUpdate",
	/**
	 * @param {Message} oldMessage
	 * @param {Message} newMessage
	 */
	async execute(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;
		// We're going to ignore all messages that are sent by the bot

		if (oldMessage.content === newMessage.content) return;
		// If content of old and new messages are the same it returns

		const Data = await DB.findOne({
			GuildID: newMessage.guild.id,
		});
		if (!Data) return;

		const logsChannel = newMessage.guild.channels.cache.get(Data.MessageLogs);

		const Original =
			oldMessage.content.slice(0, 1500) +
			(oldMessage.content.length > 1500 ? " ..." : "");

		const Edited =
			newMessage.content.slice(0, 1500) +
			(newMessage.content.length > 1500 ? " ..." : "");

		const Log = new MessageEmbed()
			.setColor("RED")
			.setTitle("A Message Has Been Updated")
			.setDescription(
				`📘 A [message](${newMessage.url}) by ${newMessage.author} was **updated** in ${newMessage.channel}.`
			)
			.addFields(
				{
					name: "Original",
					value: Original,
				},
				{
					name: "Edited",
					value: Edited,
				}
			)
			.setFooter({
				text: `Member: ${newMessage.author.tag} | Member: ${newMessage.author.id}`,
				iconURL: `${newMessage.author.avatarURL({ dynamic: true, size: 512 })}`,
			});

		logsChannel.send({ embeds: [Log] }).catch((err) => console.log(err));
	},
};
