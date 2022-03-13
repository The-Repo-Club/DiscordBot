const { Router } = require("express");
const { Permissions } = require("discord.js");

const Home = Router().get("/", async (req, res) => {
	const invite = await require("../../Systems/inviteSys")(req.client);
	const file = req.dashboardConfig.theme["home"] || "index.ejs";
	return await res.render(
		file,
		{
			rel: "home",
			bot: req.client,
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
			title: "Home | " + req.client.user.username,
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

module.exports.Router = Home;

module.exports.name = "/";
