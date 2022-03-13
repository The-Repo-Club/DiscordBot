const { Router } = require("express");

const Commands = Router().get("/", function (req, res) {
	if (req.dashboardCommands.length === 0) return res.redirect("/");
	const file = req.dashboardConfig.theme["commands"] || "commands.ejs";

	res.status(200).render(file, {
    rel: "commands",
		bot: req.client,
		title: "Commands | " + req.client.user.username,
		hostname: req.protocol + "://" + req.hostname,
		version: require("discord.js").version,
		user: req.user,
		is_logged: Boolean(req.session.user),
		dashboardDetails: req.dashboardDetails,
		dashboardConfig: req.dashboardConfig,
		baseUrl: req.dashboardConfig.baseUrl,
		port: req.dashboardConfig.port,
		hasClientSecret: Boolean(req.dashboardConfig.secret),
		commands: req.dashboardCommands,
	});
});
module.exports.Router = Commands;

module.exports.name = "/commands";
