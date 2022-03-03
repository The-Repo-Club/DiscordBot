const { model, Schema } = require("mongoose");

module.exports = model(
	"logsDB",
	new Schema({
		GuildID: { type: String, default: null },
		ChannelLogs: { type: String, default: null },
		EventsLogs: { type: String, default: null },
		EmojiLogs: { type: String, default: null },
		GuildLogs: { type: String, default: null },
		MemberLogs: { type: String, default: null },
		MessageLogs: { type: String, default: null },
		OtherLogs: { type: String, default: null },
		RoleLogs: { type: String, default: null },
		StickerLogs: { type: String, default: null },
		ThreadLogs: { type: String, default: null },
		UserLogs: { type: String, default: null },
		VoiceLogs: { type: String, default: null },
		WelcomeLogs: { type: String, default: null },
	})
);
