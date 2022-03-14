const { model, Schema } = require("mongoose");

module.exports = model(
	"announcementDB",
	new Schema({
		GuildID: { type: String, default: null },
		announcementChannel: { type: String, default: null },
	})
);
