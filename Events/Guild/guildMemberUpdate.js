/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/Guild/guildMemberUpdate.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 07:04:36 PM [GMT]
 *
 *Description:
 *   guildMemberUpdate Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, channelsDB
 **/

const { GuildMember } = require("discord.js");
const DB = require("../../Structures/Schemas/channelsDB");

module.exports = {
	name: "guildMemberUpdate",
	path: "Guild/guildMemberUpdate.js",
	/**
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 */
	async execute(oldMember, newMember) {
		const Data = await DB.findOne({
			GuildID: oldMember.guild.id,
		});
		if (!Data || !Data.roles.welcomeID) return;

		if (oldMember.pending && !newMember.pending) {
			const role = oldMember.guild.roles.cache.get(Data.roles.welcomeID);
			if (role) {
				await newMember.roles.add(role);
			}
		}
	},
};
