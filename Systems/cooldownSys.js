/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/cooldownSys.js
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
 *   cooldownSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, channelsDB
 **/

const cooldownsDB = require("../Structures/Schemas/cooldownsDB");
const ms = require("ms");

module.exports = (client) => {
	cooldownsDB.find().then((documents) => {
		documents.forEach((doc) => {
			let timestamp = doc.Time - Date.now();
			let time = Math.floor(timestamp);

			if (time <= 0) return doc.delete();

			client.cooldowns.set(doc.Details, doc.Time);

			setTimeout(async () => {
				client.cooldowns.delete(`${doc.Details}`);
				doc.delete();
			}, ms(time));
		});
	});
};
