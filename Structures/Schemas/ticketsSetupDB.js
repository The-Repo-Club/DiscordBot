const { model, Schema } = require("mongoose");

module.exports = model(
	"ticketsSetupDB",
	new Schema(
		{
			GuildID: String,
			Category: String,
			Channel: String,
			Transcript: String,
			Handlers: String,
			Description: String,
			Buttons: Array,
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
