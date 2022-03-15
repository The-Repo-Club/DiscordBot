const { model, Schema } = require("mongoose");

module.exports = model(
	"suggestDB",
	new Schema(
		{
			GuildID: String,
			MessageID: String,
			Details: Array,
			MemberID: String,
			DM: Boolean,
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
