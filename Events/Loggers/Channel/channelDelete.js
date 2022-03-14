// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Channel/channelDelete.js
// GitHub        - https://github.com/The-Repo-Club/
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Mon 14 March 2022, 03:26:26 pm (GMT)
// Modified On   - Mon 14 March 2022, 03:27:47 pm (GMT)
// -------------------------------------------------------------------------

// Logs whenever a channel is deleted

const { MessageEmbed, Channel } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB");

module.exports = {
	name: "channelDelete",
	/**
	 * @param {Channel} channel
	 */
	async execute(channel) {
		const Data = await DB.findOne({
			GuildID: channel.guild.id,
		});
		if (!Data || !Data.ChannelLogs) return;

		if (channel.type == "DM" || channel.type == "GROUP_DM") return;

		const logsChannel = channel.guild.channels.cache.get(Data.ChannelLogs); // Enter your log channel ID

		const logs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: "CHANNEL_CREATE",
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry of type "CHANNEL_CREATE"

		if (log) {
			// If log exists executes code and creates embed
			const channelDeleteEmbed = new MessageEmbed()
				.setColor("RED")
				.setTitle(
					`<:icons_deletechannel:952954846665928774> A Channel Has Been Deleted`
				)
				.setTimestamp()
				.setFooter({ text: channel.guild.name })
				.setDescription(
					`> The channel \`${channel.name}\` has been deleted by \`${log.executor.tag}\``
				)
				.addField(
					"Type",
					`\`${channel.type.slice(6).toLowerCase().replaceAll("_", " ")}\``
				);

			if (channel.type !== "GUILD_CATEGORY") {
				// If type is different than category adds the parent
				channelDeleteEmbed.addField(
					"Parent category",
					channel.parentId ? `\`${channel.parent.name}\`` : "No parent channel"
				);
			}

			logsChannel
				.send({ embeds: [channelDeleteEmbed] })
				.catch((err) => console.log(err));
		}
	},
};
