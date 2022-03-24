/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/ping.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 10:00:47 PM [GMT]
 *
 *Description:
 *   Ping Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms
 **/

const { CommandInteraction } = require("discord.js");
const ms = require("ms");

const cd = ms("5m");

module.exports = {
	name: "ping",
	path: "Admin/ping.js",
	description: "Ping",
	permission: "ADMINISTRATOR",
	cooldown: cd,
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	execute(interaction) {
		interaction.reply({ content: "Lets play PONG" });
	},
};
