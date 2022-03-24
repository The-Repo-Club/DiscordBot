const { model, Schema } = require("mongoose");

module.exports = model(
	"ecoDB",
	new Schema(
		{
			guildID: { type: String, default: null },
			userID: { type: String, default: null },
			currency: {
				wallet: { type: Number, default: 0 },
				bank: { type: Number, default: 100 },
			},
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
