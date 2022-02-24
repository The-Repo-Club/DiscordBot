// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structure/Handlers/Event.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:16:17 pm (GMT)
// -------------------------------------------------------------------------

const { Event, Events } = require("../Validation/EventNames");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Events Loaded");

	(await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
		const event = require(file);

		if (!Events.includes(event.name) || !event.name) {
			const L = file.split("/");
			await Table.addRow(
				`${event.name || "MISSING"}`,
				`⛔ Event name is eather invalid or missing: ${L[6] + `/` + L[7]}`
			);
			return;
		}

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}

		await Table.addRow(event.name, "💠 SUCCESSFUL");
	});

	console.log(Table.toString());
};
