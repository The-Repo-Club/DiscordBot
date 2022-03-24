// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/guildMemberRemove.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

// Logs whenever a member gets kicked, pruned or just leaves normally

const { MessageEmbed, GuildMember } = require("discord.js");
const DB = require("../../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const { red } = require("../../../Structures/colors.json");

module.exports = {
	name: "guildMemberRemove",
	path: "Member/guildMemberRemove.js",
	/**
	 * @param {GuildMember} member
	 */
	async execute(member) {
		if (member.user.bot) return;

		const Data = await DB.findOne({
			GuildID: member.guild.id,
		});
		if (!Data || !Data.logs.memberLogs) return;

		const logsChannel = member.guild.channels.cache.get(Data.logs.memberLogs);
		const logs = await member.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		const memberLeftEmbed = new MessageEmbed().setTitle("<:icons_banmembers:949376159274127360> A Member Left the guild").setColor(red).setTimestamp().setFooter({ text: member.guild.name });

		if (log.action == "MEMBER_KICK") {
			// If the last entry fetched is of the type "MEMBER_KICK" it means the member got prunned out of the server
			memberLeftEmbed.setDescription(`> The member \`${log.target.tag}\` has been kicked from this guild by \`${log.executor.tag}\``);
			if (log.reason) memberLeftEmbed.addField("Reason:", `\`${log.reason}\``);

			logsChannel.send({ embeds: [memberLeftEmbed] }).catch((err) => console.log(err));
		} else if (log.action == "MEMBER_PRUNE") {
			// If the last entry fetched is of the type "MEMBER_PRUNE" it means the member got prunned out of the server
			memberLeftEmbed.setDescription(`> The member \`${log.target.tag}\` has been prunned from this guild by \`${log.executor.tag}\``);
			if (log.reason) memberLeftEmbed.addField("Reason:", `\`${log.reason}\``);

			logsChannel.send({ embeds: [memberLeftEmbed] }).catch((err) => console.log(err));
		} else {
			// Else it means the member left normally
			memberLeftEmbed.setDescription(`> The member \`${member.user.tag}\` left the server`);

			logsChannel.send({ embeds: [memberLeftEmbed] }).catch((err) => console.log(err));
		}
	},
};
