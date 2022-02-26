const { model, Schema } = require("mongoose");

module.exports = model(
	"lockdownDB",
	new Schema({
		GuildID: String,
		ChannelID: String,
		Time: String,
	})
);
