const { Router } = require("express");
const { Permissions } = require("discord.js");

const Commands = Router().get("/*", async function (req, res) {
	const path = req.baseUrl.split("/").pop();
	const invite = await require("../../Systems/inviteSys")(req.client);
	if (!req.dashboardConfig.theme[path]) {
		const file = req.dashboardConfig.theme["404"] || "404.ejs";
		return res.status(404).render(file, {
			rel: "custom",
			bot: req.client,
			title: "Custom | " + req.client.user.username,
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
	}
	res.status(200).render(req.dashboardConfig.theme[path], {
		rel: "custom",
		bot: req.client,
		title: "Custom | " + req.client.user.username,
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

module.exports.name = "/*";
