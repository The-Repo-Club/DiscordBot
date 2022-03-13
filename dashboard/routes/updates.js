const { Router } = require("express");
const { parse } = require("rss-to-json");

const Updates = Router().get("/", async (req, res) => {
	const invite = await require("../../Systems/inviteSys")(req.client);
	const file = req.dashboardConfig.theme["updates"] || "updates.ejs";
	let feed = await parse(
		"https://github.com/The-Repo-Club/DiscordBot/commits.atom"
	);
	return await res.render(
		file,
		{
			rel: "updates",
			bot: req.client,
			feed: feed,
			title: "Updates | " + req.client.user.username,
			hostname: req.protocol + "://" + req.hostname,
			version: require("discord.js").version,
			user: req.user,
			invite,
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
