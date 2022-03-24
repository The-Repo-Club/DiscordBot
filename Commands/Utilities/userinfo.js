/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/userinfo.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 05:44:45 PM [GMT]
 *
 *Description:
 *   User Info Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { ContextMenuInteraction, MessageEmbed, MessageButton } = require("discord.js");
const paginationEmbed = require("../../Systems/paginationSys");
const ms = require("ms");
const { purple } = require("../../Structures/colors.json");

module.exports = {
	name: "userinfo",
	path: "Utilities/userinfo.js",
	permission: "ADMINISTRATOR",
	type: "USER",

	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 */
	async execute(interaction) {
		const Target = await interaction.guild.members.fetch(interaction.targetId);
		const member = interaction.guild.members.cache.get(Target.id);
		let emoji;

		switch (member.presence?.status) {
			case "online":
				emoji = "<:icons_online:956589301439803423>";
			case "offline":
				emoji = "<:icons_offline:956589301418827776>";
			case "idle":
				emoji = "<:icons_idle:956589301515313162>";
			case "dnd":
				emoji = "<:icons_dnd:956589301393686559>";
		}

		const userInfo = new MessageEmbed()
			.setTitle("<:icons_info:956587310365950002> General Info")
			.setAuthor({
				name: member.user.tag,
				iconURL: member.displayAvatarURL({ dynamic: true }),
			})
			.setColor(purple)
			.setThumbnail(
				member.displayAvatarURL({
					size: 1024,
					dynamic: true,
				})
			)
			.setFields(
				{
					name: "Name",
					value: `\`${member.user.username}\``,
					inline: false,
				},
				{
					name: `<:icons_id:956584146589843456> ID`,
					value: `\`${member.user.id}\``,
					inline: false,
				},
				{
					name: "<:icons_createdAt:956584146124304384> Created At",
					value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: "<:icons_join:956585127989882910> Joined at",
					value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: "<:icons_users:956584146149462016> Nickname",
					value: `\`${member.nickname ? member.nickname : `\`None\``}\``,
					inline: false,
				},
				{
					name: `${emoji} Presence`,
					value: `\`${member.presence?.status || `offline`}\``,
					inline: false,
				}
			);

		const userRole = new MessageEmbed()
			.setAuthor({
				name: member.user.tag,
				iconURL: Target.displayAvatarURL({ dynamic: true }),
			})
			.setColor(purple)
			.setThumbnail(
				member.displayAvatarURL({
					size: 1024,
					dynamic: true,
				})
			)
			.addFields(
				{
					name: "<:icons_roles:949338507325874187> Roles",
					value: `${member.roles.cache
						.map((r) => r)
						.sort((first, second) => second.position - first.position)
						.join(`, `)}`,
					inline: false,
				},
				{
					name: "<:icons_roles:949338507325874187> Highest Role",
					value: `${member.roles.highest}`,
					inline: false,
				}
			);

		const userPerms = new MessageEmbed()
			.setAuthor({
				name: member.user.tag,
				iconURL: Target.displayAvatarURL({ dynamic: true }),
			})
			.setColor(purple)
			.setThumbnail(
				member.displayAvatarURL({
					size: 1024,
					dynamic: true,
				})
			)
			.setFields({
				name: "<:icons_perms:956587310219137025> Permissions",
				value: `\`\`\`${member.permissions.toArray().join(` | `)}\`\`\``,
				inline: false,
			});

		const btn1 = new MessageButton().setStyle("DANGER").setCustomId("previousbtn").setLabel("Previous");

		const btn2 = new MessageButton().setStyle("SUCCESS").setCustomId("nextbtn").setLabel("Next");

		const btn3 = new MessageButton().setStyle("PRIMARY").setCustomId("closebtn").setLabel("Close");

		const embedList = [userInfo, userRole, userPerms];
		const buttonList = [btn1, btn2, btn3];
		const timeout = ms("10m");
		paginationEmbed(interaction, embedList, buttonList, timeout);
	},
};
