const { Router } = require("express");

const Updates = Router().get("/", async (req, res) => {
	const file = req.dashboardConfig.theme["updates"] || "updates.ejs";
	return await res.render(
		file,
		{
			rel: "home",
			bot: req.client,
			title: "Updates | " + req.client.user.username,
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
		},
		(err, html) => {
			if (err) {
				res.status(500).send(err.message);
				return console.error(err);
			}
			res.status(200).send(html);
		}
	);
});

module.exports.Router = Updates;

module.exports.name = "/updates";
