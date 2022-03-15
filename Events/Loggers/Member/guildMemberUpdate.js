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
const DB = require("../../../Structures/Schemas/channelsDB"); //Make sure this path is correct

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
		if (!Data || !Data.logs.memberLogs) return;

		const logsChannel = oldMember.guild.channels.cache.get(
			Data.logs.memberLogs
		);
		const logs = await oldMember.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		if (log.action == "MEMBER_ROLE_UPDATE") {
			// If the last entry fetched is of the type "MEMBER_ROLE_UPDATE" execute code
			if (oldMember.roles.cache.size == newMember.roles.cache.size) return; // If number of roles member has didn't change return
			const memberRoleUpdateEmbed = new MessageEmbed()
				.setTitle(
					"<:icons_updatemember:949375652291809341> One Or Multiple Roles Have Been Added/Removed To A Member"
				)
				.setDescription(
					`> Following roles have been added/removed to ${oldMember} by \`${log.executor.tag}\``
				)
				.setTimestamp()
				.setFooter({ text: newMember.guild.name });

			if (oldMember.roles.cache.size > newMember.roles.cache.size) {
				// If newMember has more roles it means roles were added
				const p = log.changes
					.find((x) => x.key == "$remove")
					.new.map((e) => `<@&${e.id}>`)
					.join(" "); // maps roles by their id to mention them
				memberRoleUpdateEmbed.addField("Removed role(s) 📛", p).setColor("RED");
			}
			if (oldMember.roles.cache.size < newMember.roles.cache.size) {
				// If oldMember has more roles it means roles were removed
				const p = log.changes
					.find((x) => x.key == "$add")
					.new.map((e) => `<@&${e.id}>`)
					.join(" "); // maps roles by their id to mention them
				memberRoleUpdateEmbed.addField("Added role(s) ✅", p).setColor("GREEN");
			}
			logsChannel
				.send({ embeds: [memberRoleUpdateEmbed] })
				.catch((err) => console.log(err));
		} else if (log.action == "MEMBER_UPDATE") {
			// If the last entry fetched is of the type "MEMBER_UPDATE" execute code
			const memberUpdateEmbed = new MessageEmbed()
				.setColor("ORANGE")
				.setTitle(
					"<:icons_updatemember:949375652291809341> A Member Has Been Updated"
				)
				.setTimestamp()
				.setFooter({ text: newMember.guild.name });

			if (oldMember.nickname !== newMember.nickname) {
				// If nickname changed execute code
				memberUpdateEmbed
					.setDescription(
						`> ${oldMember}'s nickname has been updated by \`${log.executor.tag}\``
					)
					.addFields(
						{
							name: "Old nickname",
							value: oldMember.nickname
								? `\`${oldMember.nickname}\``
								: "No nickname before",
						},
						{
							name: "New nickname",
							value: newMember.nickname
								? `\`${newMember.nickname}\``
								: "No new nickname",
						}
					);
				logsChannel
					.send({ embeds: [memberUpdateEmbed] })
					.catch((err) => console.log(err));
			}
			if (!oldMember.premiumSince && newMember.premiumSince) {
				// If oldMember has premiumSince and newMember does it means they started to boost
				memberUpdateEmbed.setDescription(
					`> ${oldMember} started boosting this server`
				);
				logsChannel
					.send({ embeds: [memberUpdateEmbed] })
					.catch((err) => console.log(err));
			}
		} else {
			// Else execute code
			const memberUpdateEmbed = new MessageEmbed()
				.setColor("ORANGE")
				.setTitle(
					"<:icons_updatemember:949375652291809341> A Member Has Been Updated"
				)
				.setTimestamp()
				.setFooter({ text: oldMember.guild.name });

			if (oldMember.avatar != newMember.avatar) {
				// If avatar changed execute code
				memberUpdateEmbed
					.setDescription(`> ${oldMember}'s avatar has been updated`)
					.setImage(newMember.avatarURL({ dynamic: true }))
					.addFields(
						{
							name: "Old avatar",
							value: oldMember.avatar
								? `${oldMember.avatarURL({ dynamic: true })}`
								: "No server avatar before",
						},
						{
							name: "New avatar",
							value: newMember.avatar
								? `${newMember.avatarURL({ dynamic: true })}`
								: "No new server avatar",
						}
					);
				logsChannel
					.send({ embeds: [memberUpdateEmbed] })
					.catch((err) => console.log(err));
			}
		}
	},
};
