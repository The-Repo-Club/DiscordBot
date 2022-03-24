const { model, Schema } = require("mongoose");

module.exports = model(
	"afkDB",
	new Schema(
		{
			Guild: String,
			User: String,
			Reason: String,
			Date: String,
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
