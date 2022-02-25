const { model, Schema } = require("mongoose");

module.exports = model(
	"cooldownDB",
	new Schema({
		Details: String,
		Time: String,
	})
);
