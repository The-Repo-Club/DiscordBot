const { Router } = require("express");

const Invite = Router().get("/*", async function (req, res) {
	return res.redirect(
		`https://discord.com/oauth2/authorize?client_id=${req?.client?.user?.id}&scope=bot%20applications.commands&permissions=8`
	);
});

module.exports.Router = Invite;

module.exports.name = "/invite";
