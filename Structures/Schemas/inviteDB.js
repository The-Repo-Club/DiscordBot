const { model, Schema } = require("mongoose");

module.exports = model(
	"inviteDB",
	new Schema({
		GuildID: { type: String, default: null },
		inviteChannel: { type: String, default: null },
	})
);
