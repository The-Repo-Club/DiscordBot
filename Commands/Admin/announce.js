// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/announce.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Mon 14 March 2022, 08:09:26 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/announcementDB"); //Make sure this path is correct
const { botsGuildID } = require("../../Structures/config.json");
const { green } = require("../../Structures/colors.json");

module.exports = {
	name: "announce",
	path: "Admin/announce.js",
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
	async execute(interaction) {
		const Data = await DB.findOne({
			GuildID: botsGuildID,
		});
		if (!Data || !Data.announcementChannel)
			return interaction.reply({
				content: "Sorry that is not setup :)",
				ephemeral: true,
			});

		const logsChannel = interaction.guild.channels.cache.get(
			Data.announcementChannel
		);

		const title = interaction.options.getString("title");
		const info = interaction.options.getString("information");

		const announcement = new MessageEmbed()
			.setTitle(`${title}`)
			.setColor(green)
			.setDescription(`${info}`)
			.setTimestamp();

		logsChannel.send({ embeds: [announcement] });
		interaction.reply({
			content: `That announcement has been sent to ${logsChannel}`,
			ephemeral: true,
		});
	},
};
