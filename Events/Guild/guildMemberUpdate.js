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
 *   node, npm, discord.js, logsDB
 **/

const { GuildMember } = require("discord.js");
const DB = require("../../Structures/Schemas/roleDB");

module.exports = {
	name: "guildMemberUpdate",
	path: "Member/guildMemberUpdate.js",
	/**
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 */
	async execute(oldMember, newMember) {
		const Data = await DB.findOne({
			GuildID: oldMember.guild.id,
		});
		if (!Data || !Data.WelcomeID) return;

		if (oldMember.pending && !newMember.pending) {
			const role = oldMember.guild.roles.cache.get(Data.WelcomeID);
			if (role) {
				await newMember.roles.add(role);
			}
		}
	},
};
