// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/staffinfo.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { Staff } = require("../../Structures/config.json");

module.exports = {
	name: "staffinfo",
	path: "Utilities/staffinfo.js",
	description: "Send/updates the staff list automaticly!",

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const List = new MessageEmbed()
			.setColor("ORANGE")
			.setTitle("Staff list")
			.setThumbnail(
				`${interaction.guild.iconURL({ size: 512, dynamic: true })}`
			)
			.setTimestamp()
			.addField("**WIP**", "Work In Progress");
		// Staff.forEach((staff) => {
		// 	List.addFields({
		// 		name: `${
		// 			client.guilds.cache
		// 				.get(interaction.guildId)
		// 				.roles.cache.find((r) => r.id == staff).name
		// 		}`,
		// 		value: `${
		// 			client.guilds.cache
		// 				.get(interaction.guildId)
		// 				.roles.cache.find((r) => r.id == staff)
		// 				.members.map((m) => m.user)
		// 				.join("\n") || "\n"
		// 		}`,
		// 		inline: false,
		// 	});
		// });

		await interaction.reply({ embeds: [List], ephemeral: true });
	},
};
