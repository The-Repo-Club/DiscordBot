const { model, Schema } = require("mongoose");

module.exports = model(
	"channelsDB",
	new Schema(
		{
			GuildID: { type: String, default: null },
			inviteChannelID: { type: String, default: null },
			commandsChannelID: { type: String, default: null },
			announcementChannelID: { type: String, default: null },
			logs: {
				channelLogs: { type: String, default: null },
				emojiLogs: { type: String, default: null },
				guildLogs: { type: String, default: null },
				joinLeaveLogs: { type: String, default: null },
				memberLogs: { type: String, default: null },
				messageLogs: { type: String, default: null },
				otherLogs: { type: String, default: null },
				roleLogs: { type: String, default: null },
				stickerLogs: { type: String, default: null },
				threadLogs: { type: String, default: null },
				userLogs: { type: String, default: null },
				voiceLogs: { type: String, default: null },
			},
			roles: {
				botsID: { type: String, default: null },
				partnersID: { type: String, default: null },
				proID: { type: String, default: null },
				supportersID: { type: String, default: null },
				helpersID: { type: String, default: null },
				welcomeID: { type: String, default: null },
			},
			status: {
				membersID: { type: String, default: null },
				botsID: { type: String, default: null },
				rolesID: { type: String, default: null },
				channelsID: { type: String, default: null },
				premiumsID: { type: String, default: null },
			},
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
