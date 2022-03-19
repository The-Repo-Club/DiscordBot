/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Structures/Handlers/buttons.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sat 19 March 2022, 04:18:23 AM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 04:24:17 AM [GMT]
 *
 *Description:
 *   Button Handler for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js,
 **/

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Buttons Loaded");
	(await PG(`${process.cwd()}/Buttons/**/*.js`)).map(async (file) => {
		const button = require(file);
		if (!button.id) return;

		client.buttons.set(button.id, button);
		await Table.addRow(button.path, "🟩 SUCCESSFUL");
	});

	console.log(Table.toString());
};
