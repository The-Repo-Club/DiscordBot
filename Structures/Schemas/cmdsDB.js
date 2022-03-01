const { model, Schema } = require("mongoose");

module.exports = model(
	"cmdsDB",
	new Schema({
		GuildID: String,
		ChannelID: String,
	})
);
