const { model, Schema } = require("mongoose");

module.exports = model(
	"levelsdb",
	new Schema(
		{
			userID: { type: String },
			guildID: { type: String },
			xp: { type: Number, default: 0 },
			level: { type: Number, default: 0 },
			badges: {
				bubble: { type: String, default: null },
				speaker: { type: String, default: null },
				stream: { type: String, default: null },
				picture: { type: String, default: null },
				like: { type: String, default: null },
				star: { type: String, default: null },
				boost: { type: String, default: null },
				money: { type: String, default: null },
				bot: { type: String, default: null },
			},
			lastUpdated: { type: Date, default: new Date() },
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
