const { model, Schema } = require("mongoose");

module.exports = model(
	"levelsdb",
	new Schema(
		{
			userID: { type: String },
			guildID: { type: String },
			xp: { type: Number, default: 0 },
			level: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: new Date() },
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
