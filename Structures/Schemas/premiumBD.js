const { model, Schema } = require("mongoose");

module.exports = model(
	"premiumDB",
	new Schema({
		isPremium: { type: Boolean, default: false },
		premium: {
			redeemedBy: { type: Array, default: null },
			redeemedAt: { type: Number, default: null },
			expiresAt: { type: Number, default: null },
			plan: { type: String, default: null },
		},
	})
);
