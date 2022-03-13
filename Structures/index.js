// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structure/index.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Sat 12 March 2022, 11:52:32 am (GMT)
// -------------------------------------------------------------------------

const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const discordjsModal = require("discord-modals"); // Define this package
discordjsModal(client); // It is necessary to have your client to be able to know when a modal is executed
const { Token, Secret, ownerIDS } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

const replacer = new RegExp("/mnt/500GB/.gitlabs/", "g");

// Requires Dashboard class from dashboard
const Dashboard = require("../dashboard");
// Initialize it
const dashboard = new Dashboard(client, {
	name: "Minimal-Mistakes",
	theme: "default",
	description: "A super cool bot with an online dashboard!",
	serverUrl: "http://discord.gg/myKsJhHNN6",
	baseUrl: "http://bot.minimal-mistakes.xyz",
	port: 80,
	secret: Secret,
});
// We now have a dashboard property to access everywhere!
client.dashboard = dashboard;

client.commands = new Collection();
client.cooldowns = new Collection();
client.maintenance = false;

["commands", "events", "loggers", "modals"].forEach((handler) => {
	require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);

process.on("uncaughtException", (exception) => {
	const error = new MessageEmbed()
		.setColor("RED")
		.setTitle("🟥 **There was an uncaught exception** 🟥")
		.setDescription(`${exception.stack.replace(replacer, "") || exception}`)
		.setTimestamp();

	for (var i = 0; i < ownerIDS.length; i++) {
		var owner = client.users.cache.get(ownerIDS[i]);

		owner.send({
			embeds: [error],
		});
	}
});

process.on("unhandledRejection", (rejection) => {
	const error = new MessageEmbed()
		.setColor("RED")
		.setTitle("🟥 **There was an uncaught rejection** 🟥")
		.setDescription(`${rejection.stack.replace(replacer, "") || rejection}`)
		.setTimestamp();

	for (var i = 0; i < ownerIDS.length; i++) {
		var owner = client.users.cache.get(ownerIDS[i]);

		owner.send({
			embeds: [error],
		});
	}
});

module.exports = client;
