// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structure/index.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:15:05 pm (GMT)
// -------------------------------------------------------------------------

const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

// Requires Dashboard class from discord-easy-dashboard
const Dashboard = require("discord-easy-dashboard");
// Initialise it
const dashboard = new Dashboard(client, {
	name: "Minimal-Mistakes",
	theme: require("../dashboard/themes/therepo.club"),
	description: "A super cool bot with an online dashboard!",
	baseUrl: "http://localhost",
	port: 8080,
	secret: "n3Se5_JUpTXzlm5_1CJOyyMETeXDYwvs",
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.maintenance = false;

["events", "loggers", "commands"].forEach((handler) => {
	require(`./Handlers/${handler}`)(client, PG, Ascii);
});

// We now have a dashboard property to access everywhere!
client.dashboard = dashboard;

client.login(Token);

module.exports = client;
