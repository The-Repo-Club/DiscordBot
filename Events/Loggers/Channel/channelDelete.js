/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/Channel/channelDelete.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Mon 14 March 2022, 11:17:33 AM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 11:31:44 AM [GMT]
 *
 *Description:
 *   channelDelete Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, channelsDB, colors.json
 **/

// Logs whenever a channel is deleted

const { MessageEmbed, Channel } = require("discord.js");
const DB = require("../../../Structures/Schemas/channelsDB");
const { red } = require("../../../Structures/colors.json");

module.exports = {
	name: "channelDelete",
	path: "Channel/channelDelete.js",
	/**
	 * @param {Channel} channel
	 */
	async execute(channel) {
		const Data = await DB.findOne({
			GuildID: channel.guild.id,
		});
		if (!Data || !Data.logs.channelLogs) return;

		if (channel.type == "DM" || channel.type == "GROUP_DM") return;

		const logsChannel = channel.guild.channels.cache.get(Data.logs.channelLogs); // Enter your log channel ID

		const logs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: "CHANNEL_CREATE",
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry of type "CHANNEL_CREATE"

		if (log) {
			// If log exists executes code and creates embed
			const channelDeleteEmbed = new MessageEmbed()
				.setColor(red)
				.setTitle(`<:icons_deletechannel:952954846665928774> A Channel Has Been Deleted`)
				.setTimestamp()
				.setFooter({ text: channel.guild.name })
				.setDescription(`> The channel \`${channel.name}\` has been deleted by \`${log.executor.tag}\``)
				.addField("Type", `\`${channel.type.slice(6).toLowerCase().replaceAll("_", " ")}\``);

			if (channel.type !== "GUILD_CATEGORY") {
				// If type is different than category adds the parent
				channelDeleteEmbed.addField("Parent category", channel.parentId ? `\`${channel.parent.name}\`` : "No parent channel");
			}

			logsChannel.send({ embeds: [channelDeleteEmbed] }).catch((err) => console.log(err));
		}
	},
};
