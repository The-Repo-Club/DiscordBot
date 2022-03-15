const mongoose = require("mongoose");

const afkSchema = mongoose.Schema(
	{
		Guild: String,
		User: String,
		Reason: String,
		Date: String,
	},
	{
		versionKey: false, // You should be aware of the outcome after set to false
	}
);

module.exports = mongoose.model("afk", afkSchema);
