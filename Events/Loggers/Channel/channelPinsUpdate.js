// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Channel/channelPinsUpdate.js
// GitHub        - https://github.com/The-Repo-Club/
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Mon 14 March 2022, 03:26:26 pm (GMT)
// Modified On   - Mon 14 March 2022, 03:27:47 pm (GMT)
// -------------------------------------------------------------------------

// Logs whenever a channel is deleted

const { MessageEmbed, Channel } = require("discord.js");
const DB = require("../../../Structures/Schemas/channelsDB");
const { red, green } = require("../../../Structures/colors.json");

module.exports = {
	name: "channelPinsUpdate",
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
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		const channelPinsChangeEmbed = new MessageEmbed()
			.setTitle(
				"<:icons_updatemember:949375652291809341> A Channel's Pins Has Been Updated"
			)
			.setTimestamp()
			.setFooter({ text: channel.guild.name });

		if (!log.target || log.target.bot) return; // If there is no target defined or the target is a bot returns (if you want messages pinned sent by bots logged you can remove (|| log.target.bot) but not the first part)

		if (log.action == "MESSAGE_PIN") {
			// If the last entry fetched is of the type "MESSAGE_PIN" executes the code
			channelPinsChangeEmbed
				.setColor(green)
				.setDescription(
					`> A message by \`${log.target.tag}\` has been pinned in ${channel} by \`${log.executor.tag}\``
				);
		}

		if (log.action == "MESSAGE_UNPIN") {
			// If the last entry fetched is of the type "MESSAGE_UNPIN" executes the code
			channelPinsChangeEmbed
				.setColor(red)
				.setDescription(
					`> A message by \`${log.target.tag}\` has been unpinned from ${channel} by \`${log.executor.tag}\``
				);
		}

		logsChannel
			.send({ embeds: [channelPinsChangeEmbed] })
			.catch((err) => console.log(err));
	},
};
