const { Client } = require("discord.js");
const DB = require("../Structures/Schemas/channelsDB"); //Make sure this path is correct

async function getField(guild, field) {
	const info = await DB.findOne({
		GuildID: guild.id,
	});

	if (!info) return;

	switch (field) {
		case "Announcement Channel":
			return info.announcementChannelID || "";

		case "Commands Channel":
			return info.commandsChannelID || "";

		case "Invite Channel":
			return info.inviteChannelID || "";

		case "Channel Logs":
			return info.logs.channelLogs || "";

		case "Emoji Logs":
			return info.logs.emojiLogs || "";

		case "Guild Logs":
			return info.logs.guildLogs || "";

		case "Join & Leave Logs":
			return info.logs.joinLeaveLogs || "";

		case "Member Logs":
			return info.logs.memberLogs || "";

		case "Message Logs":
			return info.logs.messageLogs || "";

		case "Role Logs":
			return info.logs.roleLogs || "";

		case "Sticker Logs":
			return info.logs.stickerLogs || "";

		case "Thread Logs":
			return info.logs.threadLogs || "";

		case "User Logs":
			return info.logs.userLogs || "";

		case "Voice Logs":
			return info.logs.voiceLogs || "";

		case "Other Logs":
			return info.logs.otherLogs || "";
	}
}

async function addTextField(discordClient, field, description, len = 5) {
	const validate = (prefix) => prefix.length <= len;
	const set = (discordClient, guild, value) =>
		(discordClient.prefixes[guild.id] = value);
	const get = (discordClient, guild) => getField(guild, field) || null;

	discordClient.dashboard.addTextInput(field, description, validate, set, get);
}

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	client.dashboard.addNewLine("Channel Settings", "channel");

	addTextField(
		client,
		"Announcement Channel",
		"The channel in which announcement are sent to.",
		18
	);
	addTextField(
		client,
		"Commands Channel",
		"The channel in which commands can be ran.",
		18
	);
	addTextField(
		client,
		"Invite Channel",
		"The channel in which new users will be invited to.",
		18
	);
	client.dashboard.addEndLine();
	client.dashboard.addNewLine("Logs Settings", "logs");

	addTextField(
		client,
		"Channel Logs",
		"The channel in which logs for channel events will be posted.",
		18
	);

	addTextField(
		client,
		"Emoji Logs",
		"The channel in which logs for emoji events will be posted.",
		18
	);

	addTextField(
		client,
		"Guild Logs",
		"The channel in which logs for guild events will be posted.",
		18
	);

	addTextField(
		client,
		"Join & Leave Logs",
		"The channel in which logs for join and leave events will be posted.",
		18
	);

	addTextField(
		client,
		"Member Logs",
		"The channel in which logs for member events will be posted.",
		18
	);

	addTextField(
		client,
		"Message Logs",
		"The channel in which logs for message events will be posted.",
		18
	);

	addTextField(
		client,
		"Role Logs",
		"The channel in which logs for role events will be posted.",
		18
	);

	addTextField(
		client,
		"Sticker Logs",
		"The channel in which logs for sticker events will be posted.",
		18
	);

	addTextField(
		client,
		"Thread Logs",
		"The channel in which logs for thread events will be posted.",
		18
	);

	addTextField(
		client,
		"User Logs",
		"The channel in which logs for user events will be posted.",
		18
	);
	addTextField(
		client,
		"Voice Logs",
		"The channel in which logs for voice events will be posted.",
		18
	);
	addTextField(
		client,
		"Other Logs",
		"The channel in which logs for other events will be posted.",
		18
	);

	client.dashboard.addEndLine();
};
