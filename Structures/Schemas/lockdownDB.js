const { model, Schema } = require("mongoose");

module.exports = model(
	"lockdownDB",
	new Schema(
		{
			GuildID: String,
			ChannelID: String,
			Time: String,
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
