// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/guildMemberUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

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
