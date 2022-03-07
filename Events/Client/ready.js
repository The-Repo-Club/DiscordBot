// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Client/ready.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { Client } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	/**
	 * @param {Client} client
	 */
	execute(client) {
		require("./clientInfo");

		client.user.setActivity("Development of v1.0.0", { type: "WATCHING" });

		require("../../Systems/cooldownSys")(client);
		require("../../Systems/lockdownSys")(client);
	},
};
