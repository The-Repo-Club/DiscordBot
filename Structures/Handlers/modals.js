// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structures/Handlers/modals.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:16:17 pm (GMT)
// -------------------------------------------------------------------------

const { Events } = require("../Validation/eventNames");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Modals Loaded");

	(await PG(`${process.cwd()}/Events/Modals/*/*.js`)).map(async (file) => {
		const modal = require(file);

		if (!Events.includes(modal.name) || !modal.name) {
			await Table.addRow(
				`${modal.name || "MISSING"}`,
				`🟥 Loggers Event name is either invalid or missing: ${modal.path}`
			);
			return;
		}

		if (modal.once) {
			client.once(modal.name, (...args) => modal.execute(...args, client));
		} else {
			client.on(modal.name, (...args) => modal.execute(...args, client));
		}

		await Table.addRow(modal.path, "🟩 SUCCESSFUL");
	});

	console.log(Table.toString());
};
