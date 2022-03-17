/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/staff.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:14:14 PM [GMT]
 *
 *Description:
 *   Staff Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { orange } = require("../../Structures/colors.json");
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
			.setColor(orange)
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
