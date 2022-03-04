var express = require("express");
var router = express.Router();
const Levels = require("../../../Systems/levelsSys");

router.get("/", async function (req, res, next) {
	if (!req.params.guildID)
		return res.send({ error: ["No guildID was passed"] });
});

/* GET users listing. */
router.get("/:guildID", async function (req, res, next) {
	if (!req.params.guildID)
		return res.send({ error: ["No guildID was passed"] });
	const LeaderBoard = await Levels.fetchLeaderboard(req.params.guildID, 1000);

	res.send(LeaderBoard);
});

module.exports = router;
