// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structures/Handlers/loggers.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Mon 14 March 2022, 07:59:33 pm (GMT)
// -------------------------------------------------------------------------

const { Event, Events } = require("../Validation/eventNames");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Loggers Loaded");

	(await PG(`${process.cwd()}/Events/Loggers/*/*.js`)).map(async (file) => {
		const logger = require(file);

		if (!logger.path) return Table.addRow(logger.name, "🟥 FAILED", "Missing a path.");

		if (!Events.includes(logger.name) || !logger.name) {
			await Table.addRow(`${logger.name || "MISSING"}`, `🟥 Loggers Event name is either invalid or missing: ${logger.path}`);
			return;
		}

		if (logger.once) {
			client.once(logger.name, (...args) => logger.execute(...args, client));
		} else {
			client.on(logger.name, (...args) => logger.execute(...args, client));
		}

		await Table.addRow(logger.path, "🟩 SUCCESSFUL");
	});

	console.log(Table.toString());
};
