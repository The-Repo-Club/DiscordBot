// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/RankUp/leaderboard.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
	name: "leaderboard",
	description: "Shows top 10 highest ranks in the server.",
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const LeaderBoard = await Levels.fetchLeaderboard(interaction.guild.id, 10);
		if (LeaderBoard.length < 1)
			return interaction.reply("There aren't any users in the leaderboard.");

		const leaderboard = await Levels.computeLeaderboard(
			client,
			LeaderBoard,
			true
		);
		const lb = leaderboard.map(
			(e) =>
				"```" +
				`${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
					e.level
				}\nXP: ${e.xp.toLocaleString()}` +
				"```"
		);

		const response = new MessageEmbed()
			.setTitle("**LEADERBOARD**")
			.setDescription(`${lb.join("\n\n")}`)
			.setColor("DARK_PURPLE");

		interaction.reply({ embeds: [response], ephemeral: true });
	},
};
