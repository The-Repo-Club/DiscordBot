// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Message/messageUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const { MessageEmbed, Message } = require("discord.js");
const DB = require("../../Structures/Schemas/logsDB"); //Make sure this path is correct

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

		const admin = await DB.findOne({
			GuildID: newMessage.guild.id,
		});

		const logsChannel = newMessage.guild.channels.cache.get(admin.Logs);

		const Count = 1950;

		const Original =
			oldMessage.content.slice(0, Count) +
			(oldMessage.content.length > 1950 ? " ..." : "");

		const Edited =
			newMessage.content.slice(0, Count) +
			(newMessage.content.length > 1950 ? " ..." : "");

		const Log = new MessageEmbed()
			.setColor("RED")
			.setDescription(
				`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.`
			)
			.addField("Original", Original)
			.addField("Edited", Edited)
			.setFooter({
				text: `Member: ${newMessage.author.tag} | Member: ${newMessage.author.id}`,
				iconURL: `${newMessage.author.avatarURL({ dynamic: true, size: 512 })}`,
			});

		logsChannel.send({ embeds: [Log] }).catch((err) => console.log(err));
	},
};
