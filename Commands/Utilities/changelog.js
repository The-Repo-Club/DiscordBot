/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/changelog.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 06:07:27 PM [GMT]
 *
 *Description:
 *   Changelog Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "changelog",
	path: "Utilities/changelog.js",
	description: "Shows the latest changes in the bot.",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { member } = interaction;

		const bVersion = "1.0.0-1";

		const embed = new MessageEmbed()
			.setTitle("📜 Change Log for " + client.user.username)
			.setDescription("The latest changes in the bot.")
			.setColor(0x00ff00)
			.setDescription(`Current **Bot Version**: __${bVersion}__`)
			.addField("1.0.0-1", "initial setup", true)
			.setTimestamp()
			.setFooter({
				text: `Requested By: ${member.user.tag}`,
				iconURL: `${member.user.avatarURL({ dynamic: true, size: 512 })}`,
			});

		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
