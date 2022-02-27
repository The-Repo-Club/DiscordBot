// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/maintenance.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
	name: "maintenance",
	description: "Only for bot owner.",
	permission: "ADMINISTRATOR",
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	execute(interaction, client) {
		if (
			client.maintenance === false &&
			interaction.user.id == "861270236475817994"
		) {
			client.maintenance = true;

			const bot = new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Maintenance mode **enabled** ✅")
				.setDescription(`👷‍♂️ The bot has been put into maintenance mode. 👷‍♂️`)
				.setTimestamp();

			return interaction
				.reply({ embeds: [bot], fetchReply: true })
				.then((msg) => {
					setTimeout(() => msg.delete(), ms("5s"));
				});
		}

		if (client.maintenance && interaction.user.id == "861270236475817994") {
			client.maintenance = false;

			const bot = new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Maintenance mode **disabled** 🟥")
				.setDescription(`👷‍♂️ The bot has been taken out of maintenance mode. 👷‍♂️`)
				.setTimestamp();

			return interaction
				.reply({ embeds: [bot], fetchReply: true })
				.then((msg) => {
					setTimeout(() => msg.delete(), ms("5s"));
				});
		}

		interaction
			.reply({ content: "No go away.", fetchReply: true })
			.then((msg) => {
				setTimeout(() => msg.delete(), ms("5s"));
			});
	},
};
