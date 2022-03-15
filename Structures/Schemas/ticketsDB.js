const { model, Schema } = require("mongoose");

module.exports = model(
	"ticketsDB",
	new Schema(
		{
			GuildID: String,
			MembersID: Array,
			TicketID: String,
			ChannelID: String,
			Closed: Boolean,
			Locked: Boolean,
			Type: String,
			Claimed: Boolean,
			ClaimedBy: String,
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
