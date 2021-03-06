/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/levelsSys.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sat 19 March 2022, 04:18:23 AM [GMT]
 *Last edited:
 *   Wed 23 March 2022, 12:06:12 AM [GMT]
 *
 *Description:
 *   levelsSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, mongoose, levelsDB
 **/

const mongoose = require("mongoose");
const levels = require("../Structures/Schemas/levelsDB");
class DiscordXp {
	/**
	 * @param {string} [dbUrl] - A valid mongo database URI.
	 */

	static async setURL(dbUrl) {
		if (!dbUrl) throw new TypeError("A database url was not provided.");
		return mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	/**
	 * @param {string} [userId] - Discord user id.
	 * @param {string} [guildId] - Discord guild id.
	 * @param {number} [xp] - Amount of xp to append.
	 */

	static async appendXp(userId, guildId, xp) {
		if (!userId) throw new TypeError("An user id was not provided.");
		if (!guildId) throw new TypeError("A guild id was not provided.");
		if (xp == 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("An amount of xp was not provided/was invalid.");

		const user = await levels.findOne({ userID: userId, guildID: guildId });

		if (!user) {
			const newUser = new levels({
				userID: userId,
				guildID: guildId,
				xp: xp,
				level: parseInt((1 + Math.sqrt(1 + (8 * xp) / 5000)) / 2),
			});

			await newUser.save().catch((e) => console.log(`Failed to save new user.`));

			return parseInt((1 + Math.sqrt(1 + (8 * user.xp) / 5000)) / 2) > 0;
		}

		user.xp += parseInt(xp, 10);
		user.level = parseInt((1 + Math.sqrt(1 + (8 * user.xp) / 5000)) / 2);
		user.lastUpdated = new Date();

		await user.save().catch((e) => console.log(`Failed to append xp: ${e}`));

		return parseInt((1 + Math.sqrt(1 + (8 * user.xp) / 5000)) / 2) < user.level;
	}

	/**
	 * @param {string} [userId] - Discord user id.
	 * @param {string} [guildId] - Discord guild id.
	 */

	static async fetch(userId, guildId, fetchPosition = false) {
		if (!userId) throw new TypeError("An user id was not provided.");
		if (!guildId) throw new TypeError("A guild id was not provided.");

		const user = await levels.findOne({
			userID: userId,
			guildID: guildId,
		});
		if (!user) return false;

		if (fetchPosition === true) {
			const leaderboard = await levels
				.find({
					guildID: guildId,
				})
				.sort([["xp", "descending"]])
				.exec();

			user.position = leaderboard.findIndex((i) => i.userID === userId) + 1;
		}

		return user;
	}

	/**
	 * @param {string} [guildId] - Discord guild id.
	 * @param {number} [limit] - Amount of maximum enteries to return.
	 */

	static async fetchLeaderboard(guildId, limit) {
		if (!guildId) throw new TypeError("A guild id was not provided.");
		if (!limit) throw new TypeError("A limit was not provided.");

		var users = await levels
			.find({ guildID: guildId })
			.sort([["xp", "descending"]])
			.exec();

		return users.slice(0, limit);
	}

	/**
	 * @param {string} [client] - Your Discord.CLient.
	 * @param {array} [leaderboard] - The output from 'fetchLeaderboard' function.
	 */

	static async computeLeaderboard(client, leaderboard, fetchUsers = false) {
		if (!client) throw new TypeError("A client was not provided.");
		if (!leaderboard) throw new TypeError("A leaderboard id was not provided.");

		if (leaderboard.length < 1) return [];

		const computedArray = [];

		if (fetchUsers) {
			for (const key of leaderboard) {
				const user = (await client.users.fetch(key.userID)) || {
					username: "Unknown",
					discriminator: "0000",
				};
				computedArray.push({
					guildID: key.guildID,
					userID: key.userID,
					xp: key.xp,
					level: key.level,
					position: leaderboard.findIndex((i) => i.guildID === key.guildID && i.userID === key.userID) + 1,
					username: user.username,
					discriminator: user.discriminator,
				});
			}
		} else {
			leaderboard.map((key) =>
				computedArray.push({
					guildID: key.guildID,
					userID: key.userID,
					xp: key.xp,
					level: key.level,
					position: leaderboard.findIndex((i) => i.guildID === key.guildID && i.userID === key.userID) + 1,
					username: client.users.cache.get(key.userID) ? client.users.cache.get(key.userID).username : "Unknown",
					discriminator: client.users.cache.get(key.userID) ? client.users.cache.get(key.userID).discriminator : "0000",
				})
			);
		}

		return computedArray;
	}

	/**
	 * @param {number} [targetLevel] - Xp required to reach that level.
	 */
	static xpFor(targetLevel) {
		if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10))) throw new TypeError("Target level should be a valid number.");
		if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
		if (targetLevel < 0) throw new RangeError("Target level should be a positive number.");
		return parseInt(((Math.pow(targetLevel, 2) - targetLevel) * 5000) / 2);
	}

	/**
	 * @param {string} [guildId] - Discord guild id.
	 */

	static async deleteGuild(guildId) {
		if (!guildId) throw new TypeError("A guild id was not provided.");

		const guild = await levels.findOne({ guildID: guildId });
		if (!guild) return false;

		await levels.deleteMany({ guildID: guildId }).catch((e) => console.log(`Failed to delete guild: ${e}`));

		return guild;
	}
}

module.exports = DiscordXp;
