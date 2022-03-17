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
const { Token, Secret } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
require("./Handlers/errors");

// Requires Dashboard class from dashboard
const Dashboard = require("../dashboard");
// Initialize it
const dashboard = new Dashboard(client, {
	name: "Minimal-Mistakes",
	theme: "default",
	description: "A super cool bot with an online dashboard!",
	baseUrl: "bot.minimal-mistakes.xyz",
	https: true,
	port: 443,
	secret: Secret,
});
// We now have a dashboard property to access everywhere!
client.dashboard = dashboard;

require("./dashboard.js")(client);

client.commands = new Collection();
client.cooldowns = new Collection();
client.maintenance = false;

["commands", "events", "loggers", "modals"].forEach((handler) => {
	require(`./Handlers/${handler}`)(client, PG, Ascii).catch((err) =>
		console.log(err)
	);
});

client.login(Token).catch((err) => console.log(err));

module.exports = client;
