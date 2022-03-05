const { model, Schema } = require("mongoose");

module.exports = model(
	"roleDB",
	new Schema({
		GuildID: String,
		BotsID: { type: String, default: null },
		PartnersID: { type: String, default: null },
		PremiumID: { type: String, default: null },
		SupportersID: { type: String, default: null },
		WelcomeID: { type: String, default: null },
	})
);
