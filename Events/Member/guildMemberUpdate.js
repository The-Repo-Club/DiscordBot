// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/guildMemberUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

// Logs whenever a member's roles have changed, their nickname changed, they started boosting, or their server avatar changed

const { MessageEmbed, GuildMember } = require("discord.js");
const DB = require("../../Structures/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "guildMemberUpdate",
	/**
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 */
	async execute(oldMember, newMember) {
		if (oldMember.pending && !newMember.pending) {
			const role = newMember.guild.roles.cache.find(
				(role) => role.name.toLowerCase() === "member"
			);
			if (role) {
				await newMember.roles.add(role);
			}
		}
	},
};
