const { model, Schema } = require("mongoose");

module.exports = model(
	"proDB",
	new Schema(
		{
			isPro: { type: Boolean, default: false },
			pro: {
				redeemedBy: { type: Array, default: null },
				redeemedAt: { type: Number, default: null },
				expiresAt: { type: Number, default: null },
				plan: { type: String, default: null },
			},
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
