const { Router } = require("express");
const CheckAuth = (req, res, next) =>
	req.session.user ? next() : res.status(401).redirect("/auth/login");
const LevelUp = require("../../Systems/levelsSys");
const { Permissions } = require("discord.js");

const Levels = Router()
	.get("/:guildID", CheckAuth, async (req, res) => {
		const guild = req.client.guilds.cache.get(req.params.guildID);
		if (!guild) return res.redirect("/dashboard");

		const member = await guild.members.fetch(req.user.id);
		if (!member || !member.permissions.has(req.dashboardConfig.lvlpermissions))
			return res.redirect("/dashboard");

		const LeaderBoard = await LevelUp.fetchLeaderboard(guild.id, 10);

		const invite = await require("../../Systems/inviteSys")(req.client);
		const file = req.dashboardConfig.theme["levels"] || "levels.ejs";
		return await res.render(
			file,
			{
				rel: "levels",
				bot: req.client,
				title: "Levels | " + req.client.user.username,
				hostname: req.protocol + "://" + req.hostname,
				version: require("discord.js").version,
				user: req.user,
				Perms: Permissions,
				invite,
				guild,
				is_logged: Boolean(req.session.user),
				dashboardDetails: req.dashboardDetails,
				dashboardConfig: req.dashboardConfig,
				baseUrl: req.dashboardConfig.baseUrl,
				port: req.dashboardConfig.port,
				hasClientSecret: Boolean(req.dashboardConfig.secret),
				levels: LeaderBoard,
			},
			(err, html) => {
				if (err) {
					res.status(500).send(err.message);
					return console.error(err);
				}
				res.status(200).send(html);
			}
		);
	})
	.get("/", CheckAuth, (req, res) => {
		res.redirect("/");
	});

module.exports.Router = Levels;

module.exports.name = "/levels";
