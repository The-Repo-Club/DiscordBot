// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Message/messageUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const { Logs } = require("../../Structure/config.json");

module.exports = {
	name: "messageUpdate",
	/**
	 * @param {Message} oldMessage
	 * @param {Message} newMessage
	 */
	execute(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;
		// We're going to ignore all messages that are sent by the bot

		if (oldMessage.content === newMessage.content) return;

		const logsChannel = newMessage.guild.channels.cache.get(Logs);

		const Count = 1950;

		const Original =
			oldMessage.content.slice(0, Count) +
			(oldMessage.content.length > 1950 ? " ..." : "");

		const Edited =
			newMessage.content.slice(0, Count) +
			(newMessage.content.length > 1950 ? " ..." : "");

		const Log = new MessageEmbed()
			.setColor("RANDOM")
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
