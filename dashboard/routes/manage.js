const { Router } = require("express");
const CheckAuth = (req, res, next) =>
	req.session.user ? next() : res.status(401).redirect("/auth/login");

const Server = Router()
	.get("/:guildID", CheckAuth, async (req, res) => {
		const guild = req.client.guilds.cache.get(req.params.guildID);
		if (!guild) return res.redirect("/dashboard");

		const member = await guild.members.fetch(req.user.id);
		if (!member || !member.permissions.has(req.dashboardConfig.permissions))
			return res.redirect("/dashboard");
		const file = req.dashboardConfig.theme["guild"] || "guild.ejs";

		return await res.render(
			file,
			{
				bot: req.client,
				title: "Manage | " + req.client.user.username,
				hostname: req.protocol + "://" + req.hostname,
				version: require("discord.js").version,
				user: req.user,
				is_logged: Boolean(req.session.user),
				guild,
				alert: null,
				errors: false,
				port: req.dashboardConfig.port,
				dashboardDetails: req.dashboardDetails,
				dashboardConfig: req.dashboardConfig,
				commands: req.dashboardCommands,
				settings: req.dashboardSettings,
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
	.post("/:guildID", CheckAuth, async (req, res) => {
		const guild = req.client.guilds.cache.get(req.params.guildID);
		if (!guild) return res.redirect("/dashboard");

		const member = await guild.members.fetch(req.user.id);
		if (!member) return res.redirect("/dashboard");
		if (!member.permissions.has(req.dashboardConfig.permissions))
			return res.redirect("/dashboard");

		const errors = [];
		Object.keys(req.body).forEach((item) => {
			const setting = req.dashboardSettings.find((x) => x.name === item);
			if (!setting) return res.redirect("/dashboard");

			if (setting.validator && !setting.validator(req.body[item]))
				return errors.push(item);

			if (setting.type === "boolean input")
				req.body[item] = Array.isArray(req.body[item]) ? true : false;

			setting.set(req.client, guild, req.body[item]);
		});
		const file = req.dashboardConfig.theme["guild"] || "guild.ejs";

    return await res.render(
			file,
			{
				bot: req.client,
				title: "Manage | " + req.client.user.username,
				hostname: req.protocol + "://" + req.hostname,
				version: require("discord.js").version,
				user: req.user,
				is_logged: Boolean(req.session.user),
				guild,
				alert:
					errors.length > 0
						? `The following items are invalid and have not been saved: ${errors.join(
								", "
						  )}.`
						: "Your settings have been saved.",
				errors: errors.length > 0,
				port: req.dashboardConfig.port,
				dashboardDetails: req.dashboardDetails,
				dashboardConfig: req.dashboardConfig,
				commands: req.dashboardCommands,
				settings: req.dashboardSettings,
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
		res.redirect("/dashboard");
	});

module.exports.Router = Server;

module.exports.name = "/manage";
