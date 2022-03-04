var express = require("express");
var router = express.Router();
const Levels = require("../../../Systems/levelsSys");

/* GET users listing. */
router.get("/:guildID", async function (req, res, next) {
	if (!req.params.guildID) return res.send("No guildID was sent.");
	const LeaderBoard = await Levels.fetchLeaderboard(req.params.guildID, 10);

	res.send(LeaderBoard);
});

module.exports = router;
