const { model, Schema } = require("mongoose");

module.exports = model(
	"warningDB",
	new Schema({
		GuildID: String,
		UserID: String,
		UserTag: String,
		Content: Array,
	})
);
