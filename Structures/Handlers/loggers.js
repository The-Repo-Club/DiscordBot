// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structures/Handlers/loggers.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:16:17 pm (GMT)
// -------------------------------------------------------------------------

const { Event, Events } = require("../Validation/eventNames");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Loggers Loaded");

	(await PG(`${process.cwd()}/Events/Loggers/*/*.js`)).map(async (file) => {
		const event = require(file);
		const evtName = file.split("/")[7] + "/" + file.split("/")[8];

		if (!Events.includes(event.name) || !event.name) {
			await Table.addRow(
				`${event.name || "MISSING"}`,
				`🟥 Loggers Event name is either invalid or missing: ${evtName}`
			);
			return;
		}

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}

		await Table.addRow(evtName, "🟩 SUCCESSFUL");
	});

	console.log(Table.toString());
};
