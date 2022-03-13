const { Router } = require("express");
const CheckAuth = (req, res, next) =>
	req.session.user ? next() : res.status(401).redirect("/auth/login");
const { Permissions } = require("discord.js");

const Dashboard = Router().get("/", CheckAuth, async (req, res) => {
	const file = req.dashboardConfig.theme["dashboard"] || "dashboard.ejs";
	return await res.render(
		file,
		{
			rel: "dashboard",
			bot: req.client,
			title: "Dashboard | " + req.client.user.username,
			hostname: req.protocol + "://" + req.hostname,
			version: require("discord.js").version,
			user: req.user,
			guilds: req.user.guilds.sort((a, b) =>
				a.name < b.name ? -1 : Number(a.name > b.name)
			),
			is_logged: Boolean(req.session.user),
			Perms: Permissions,
			path: req.path,
			baseUrl: req.dashboardConfig.baseUrl,
			port: req.dashboardConfig.port,
			dashboardDetails: req.dashboardDetails,
			dashboardConfig: req.dashboardConfig,
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

module.exports.Router = Dashboard;

module.exports.name = "/dashboard";
