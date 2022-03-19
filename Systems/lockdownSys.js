/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/lockdownSys.js
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
 *   lockdownSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, lockdownDB
 **/

const { Client } = require("discord.js");
const lockdownDB = require("../Structures/Schemas/lockdownDB");

/**
 * @param {Client}
 */
module.exports = async (client) => {
	lockdownDB.find().then(async (documentsArray) => {
		documentsArray.forEach((doc) => {
			const Channel = client.guild.cache.get(doc.GuildID).channels.cache.get(doc.ChannelID);
			if (!Channel) return;

			const TimeNow = Date.now();
			if (doc.time < TimeNow)
				return Channel.permissionsOverwrites.edit(d.GuildID, {
					SEND_MESSAGES: null,
				});

			const expDate = doc.Time - Date.now();

			setTimeout(async () => {
				Channel.permissionOverwrites.edit(d.GuildID, {
					SEND_MESSAGES: null,
				});
				await lockdownDB.deleteOne({ ChannelID: Channel.id });
			}, expDate);
		});
	});
};
