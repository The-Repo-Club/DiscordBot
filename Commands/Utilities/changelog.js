// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/changelog.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "changelog",
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
