// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/staffinfo.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const Staff = ["Founder", "The-Repo-Bot"];

module.exports = {
	name: "staff",
	description: "Send/updates the staff list automaticly!",

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const List = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Staff list")
			.setThumbnail(
				`${interaction.guild.iconURL({ size: 512, dynamic: true })}`
			)
			.setTimestamp();
		Staff.forEach((staff) => {
			List.addFields({
				name: `${staff}`,
				value: `${
					client.guilds.cache
						.get(interaction.guildId)
						.roles.cache.find((r) => r.name == staff)
						.members.map((m) => `${m.user}`)
						.join("\n") || "\n"
				}`,
				inline: false,
			});
		});

		return interaction.reply({ embeds: [List], ephemeral: true });
	},
};
