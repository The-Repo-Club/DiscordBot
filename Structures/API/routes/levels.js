var express = require("express");
var router = express.Router();
const Levels = require("../../../Systems/levelsSys");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	const LeaderBoard = await Levels.fetchLeaderboard("945963538474754058", 10);

	res.send(LeaderBoard);
});

module.exports = router;
