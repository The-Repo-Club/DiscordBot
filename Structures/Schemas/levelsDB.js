const { model, Schema } = require("mongoose");

module.exports = model(
	"Levels",
	new Schema({
		userID: { type: String },
		guildID: { type: String },
		xp: { type: Number, default: 0 },
		level: { type: Number, default: 0 },
		lastUpdated: { type: Date, default: new Date() },
	})
);
