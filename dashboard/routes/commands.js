const { Router } = require("express");
const { Permissions } = require("discord.js");

const Commands = Router().get("/", async function (req, res) {
	if (req.dashboardCommands.length === 0) return res.redirect("/");
	const invite = await require("../../Systems/inviteSys")(req.client);
	const file = req.dashboardConfig.theme["commands"] || "commands.ejs";

	res.status(200).render(file, {
		rel: "commands",
		bot: req.client,
		title: "Commands | " + req.client.user.username,
		hostname: req.protocol + "://" + req.hostname,
		version: require("discord.js").version,
		user: req.user,
		invite,
		is_logged: Boolean(req.session.user),
		Perms: Permissions,
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
