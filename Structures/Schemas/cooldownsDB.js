const { model, Schema } = require("mongoose");

module.exports = model(
	"cooldownDB",
	new Schema(
		{
			Details: String,
			Time: String,
		},
		{
			versionKey: false, // You should be aware of the outcome after set to false
		}
	)
);
