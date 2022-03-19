/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Client/ready.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 04:09:23 AM [GMT]
 *
 *Description:
 *   Ready Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { Client } = require("discord.js");

module.exports = {
	name: "ready",
	path: "Client/ready.js",
	once: true,
	/**
	 * @param {Client} client
	 */
	execute(client) {
		require("./clientInfo");

		client.user.setActivity("Development of v1.0.0", { type: "WATCHING" });
	},
};
