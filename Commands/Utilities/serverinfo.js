/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/serverinfo.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Mon 21 March 2022, 08:46:12 PM [GMT]
 *
 *Description:
 *   Server Info Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, moment, ms, paginationSys
 **/

const { CommandInteraction, MessageEmbed, MessageButton } = require("discord.js");
const moment = require("moment");
const paginationEmbed = require("../../Systems/paginationSys");
const ms = require("ms");
const { yellow } = require("../../Structures/colors.json");

const filterLevels = {
	DISABLED: "Off",
	MEMBER_WITHOUT_ROLES: "No Role",
	ALL_MEMBERS: "Everyone",
};

const verificationLevels = {
	NONE: "None",
	LOW: "Low",
	MEDIUM: "Medium",
	HIGH: "High",
	VERY_HIGH: "Very High",
};

module.exports = {
	name: "serverinfo",
	path: "Utilities/serverinfo.js",
	description: "Sends the server's information",

	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const { guild } = interaction;
		const rList = [];
		const roles = guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((role) => role)
			.slice(0, -1);
		roles.filter(function (role) {
			if (!role.managed || role.tags.premiumSubscriberRole) {
				rList.push(role);
			}
		});
		let roleDisplay;
		if (rList.length < 20) {
			roleDisplay = rList.join(" ");
			if (rList.length < 1) roleDisplay = "None";
		} else {
			roleDisplay = `${rList.slice(20).join(" ")} \`and more...\``;
		}

		const members = guild.members.cache;
		const channels = guild.channels.cache;
		const emojis = guild.emojis.cache;
		const owner = client.users.cache.get(guild.ownerId);

		const serverEmbed = new MessageEmbed()
			.setColor(yellow)
			.setTitle(`Server Information for ${guild.name}`)
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addField(
				"__General__",
				`**❯ Name:** \`${guild.name}\`
		  **❯ ID:** \`${guild.id}\`
		  **❯ Owner:** \`${owner.tag}\` \`(${guild.ownerId})\`
		  **❯ Boost Tier:** \`${guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"}\`
		  **❯ Explicit Filter:** \`${filterLevels[guild.explicitContentFilter]}\`
		  **❯ Verification Level:** \`${verificationLevels[guild.verificationLevel]}\`
		  **❯ Time Created:** \`${moment(guild.createdTimestamp).format("LT")} ${moment(guild.createdTimestamp).format("LL")} ${moment(guild.createdTimestamp).fromNow()}\`\n\n`
			)
			.addField(
				"__Statistics__",
				`**❯ Role Count:** \`${roles.length}\`
		  **❯ Emoji Count:** \`${emojis.size}\`
		  **❯ Regular Emoji Count:** \`${emojis.filter((emoji) => !emoji.animated).size}\`
		  **❯ Animated Emoji Count:** \`${emojis.filter((emoji) => emoji.animated).size}\`
		  **❯ Member Count:** \`${guild.memberCount}\`
		  **❯ Humans:** \`${members.filter((member) => !member.user.bot).size}\`
		  **❯ Bots:** \`${members.filter((member) => member.user.bot).size}\`
		  **❯ Text Channels:** \`${channels.filter((channel) => channel.type === "GUILD_TEXT").size}\`
		  **❯ Voice Channels:** \`${channels.filter((channel) => channel.type === "GUILD_VOICE").size}\`
		  **❯ Boost Count:**\`${guild.premiumSubscriptionCount || "0"}\`\n\n`
			)
			.setTimestamp();

		const roleEmbed = new MessageEmbed()
			.setColor(yellow)
			.setTitle(`Server Information for ${guild.name}`)
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addField(`Roles [${roles.length}]`, roleDisplay)
			.setTimestamp();

		const btn1 = new MessageButton().setStyle("DANGER").setCustomId("previousbtn").setLabel("Previous");

		const btn2 = new MessageButton().setStyle("SUCCESS").setCustomId("nextbtn").setLabel("Next");

		const btn3 = new MessageButton().setStyle("PRIMARY").setCustomId("closebtn").setLabel("Close");

		const embedList = [serverEmbed, roleEmbed];
		const buttonList = [btn1, btn2, btn3];
		const timeout = ms("10m");
		paginationEmbed(interaction, embedList, buttonList, timeout);
	},
};
