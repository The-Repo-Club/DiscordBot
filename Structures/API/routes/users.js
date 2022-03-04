var express = require("express");
var router = express.Router();

const client = require("../../index");

/* GET users listing. */
router.get("/:guildID", function (req, res, next) {
	if (!req.params.guildID) return res.send("No guildID was sent.");
	const list = client.guilds.cache.get(req.params.guildID);

	res.send(list.members.cache);
});

module.exports = router;
