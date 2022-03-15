/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/RankUp/leaderboard.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 05:47:08 PM [GMT]
 *
 *Description:
 *   Leaderboard Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, levelsSys
 **/

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const Levels = require("../../Systems/levelsSys");

module.exports = {
	name: "leaderboard",
	path: "RankUp/leaderboard.js",
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
