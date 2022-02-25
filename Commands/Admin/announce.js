// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/announce.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Logs } = require("../../Structures/config.json");

module.exports = {
	name: "announce",
	description:
		"Announces whatever you want to announce in the announcement channel.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "title",
			description: "Provide the title of what you want to announce.",
			type: "STRING",
			required: true,
		},
		{
			name: "information",
			description: "Provide the information that you want to announce.",
			type: "STRING",
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	execute(interaction) {
		const logsChannel = interaction.guild.channels.cache.get(Logs);

		const title = interaction.options.getString("title");
		const info = interaction.options.getString("information");

		const announcement = new MessageEmbed()
			.setTitle(`${title}`)
			.setColor("GREEN")
			.setDescription(`${info}`)
			.setTimestamp();

		logsChannel.send({ embeds: [announcement] });
	},
};
