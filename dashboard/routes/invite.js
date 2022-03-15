const { Router } = require("express");

const Invite = Router().get("/", async (req, res) => {
	const invite = await require("../../Systems/inviteSys")(req.client);
	const file = req.dashboardConfig.theme["invite"] || "invite.ejs";
	return await res.render(
		file,
		{
			rel: "updates",
			bot: req.client,
			title: "Updates | " + req.client.user.username,
			hostname: req.protocol + "://" + req.hostname,
			version: require("discord.js").version,
			invite,
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

module.exports.Router = Invite;

module.exports.name = "/invite";
