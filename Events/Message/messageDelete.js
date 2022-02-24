// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Message/messageUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const { MessageEmbed, Message } = require("discord.js");
const DB = require("../../Structure/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "messageDelete",
	/**
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot) return;
		// We're going to ignore all messages that are sent by the bot
		const admin = await DB.findOne({
			GuildID: message.guild.id,
		});

		const logsChannel = message.guild.channels.cache.get(admin.Logs);

		const Count = 1950;

		const Deleted =
			message.content.slice(0, Count) +
			(message.content.length > 1950 ? " ..." : "");

		const Log = new MessageEmbed()
			.setColor("RED")
			.setDescription(
				`📘 A [message](${message.url}) by ${message.author} was **deleted** in ${message.channel}.`
			)
			.addField("Deleted", Deleted)
			.setFooter({
				text: `Member: ${message.author.tag} | Member: ${message.author.id}`,
				iconURL: `${message.author.avatarURL({ dynamic: true, size: 512 })}`,
			});

		logsChannel.send({ embeds: [Log] }).catch((err) => console.log(err));
	},
};
