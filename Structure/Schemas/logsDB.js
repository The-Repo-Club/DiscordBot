const { model, Schema } = require("mongoose");

module.exports = model(
	"logsDB",
	new Schema({
		GuildID: String,
		Logs: String,
	})
);
