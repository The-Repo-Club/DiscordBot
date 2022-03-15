/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Client/clientInfo.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 07:00:10 PM [GMT]
 *
 *Description:
 *   Client Info Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, chalkm, cli-boxn, mongoose
 **/

const chalk = require("chalk");
const Box = require("cli-box");

const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
	name: "ready",
	path: "Client/clientInfo.js",
	once: true,
	/**
	 * @param {Client} client
	 */
	execute(client) {
		function clientInfo(client) {
			const ClientBoxHeader = new Box(
				{
					w: Math.floor(client.user.tag.length + 35),
					h: 1,
					stringify: false,
					marks: {
						nw: "╭",
						n: "─",
						ne: "╮",
						e: "│",
						se: "╯",
						s: "─",
						sw: "╰",
						w: "│",
					},
					hAlign: "middle",
				},
				"C L I E N T   I N F O R M A T I O N"
			).stringify();

			const ClientBox = new Box(
				{
					w: Math.floor(client.user.tag.length + 35),
					h: 9,
					stringify: false,
					marks: {
						nw: "╭",
						n: "─",
						ne: "╮",
						e: "│",
						se: "╯",
						s: "─",
						sw: "╰",
						w: "│",
					},
					hAlign: "middle",
				},
				`
${chalk.bold.blueBright("Client Details")} :: ${chalk.redBright(
					client.user.tag
				)}
${chalk.bold.blueBright("Guilds Count")} :: ${chalk.redBright(
					client.guilds.cache.size
				)}
${chalk.bold.blueBright("Users Count")}:: ${chalk.redBright(
					client.users.cache.size
				)}
${chalk.bold.blueBright("Channels Count")}:: ${chalk.redBright(
					client.channels.cache.size
				)}
${chalk.bold.blueBright("Commands Count")} :: ${chalk.redBright(
					client.dashboard._commands.length
				)}
${chalk.bold.blueBright("NodeJS Version")} :: ${chalk.redBright(
					process.version
				)}
${chalk.bold.blueBright("Discord.js Version")} :: ${chalk.redBright(
					require("discord.js").version
				)}
`
			).stringify();

			const DashboardBoxHeader = new Box(
				{
					w: Math.floor(client.user.tag.length + 35),
					h: 1,
					stringify: false,
					marks: {
						nw: "╭",
						n: "─",
						ne: "╮",
						e: "│",
						se: "╯",
						s: "─",
						sw: "╰",
						w: "│",
					},
					hAlign: "middle",
				},
				"D A S H B O A R D   I N F O R M A T I O N"
			).stringify();

			const DashboardBox = new Box(
				{
					w: Math.floor(client.user.tag.length + 35),
					h: 5,
					stringify: false,
					marks: {
						nw: "╭",
						n: "─",
						ne: "╮",
						e: "│",
						se: "╯",
						s: "─",
						sw: "╰",
						w: "│",
					},
					hAlign: "middle",
				},
				`
${chalk.bold.blueBright("baseUrl")} :: ${chalk.redBright(
					client.dashboard.config.baseUrl
				)}
${chalk.bold.blueBright("port")} :: ${chalk.redBright(
					client.dashboard.config.port
				)}
${chalk.bold.blueBright("routes")} :: ${chalk.redBright(
					client.dashboard.routes
				)}`
			).stringify();

			console.log(chalk.bold.greenBright(ClientBoxHeader));
			console.log(chalk.bold.greenBright(ClientBox));

			console.log(chalk.bold.greenBright(DashboardBoxHeader));
			console.log(chalk.bold.greenBright(DashboardBox));
		}

		clientInfo(client);

		if (!Database) return;
		mongoose
			.connect(Database, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				const DatabaseBoxHeader = new Box(
					{
						w: Math.floor(client.user.tag.length + 35),
						h: 1,
						stringify: false,
						marks: {
							nw: "╭",
							n: "─",
							ne: "╮",
							e: "│",
							se: "╯",
							s: "─",
							sw: "╰",
							w: "│",
						},
						hAlign: "middle",
					},
					"D A T A B A S E   I N F O R M A T I O N"
				).stringify();

				const DatabaseBox = new Box(
					{
						w: Math.floor(client.user.tag.length + 35),
						h: 3,
						stringify: false,
						marks: {
							nw: "╭",
							n: "─",
							ne: "╮",
							e: "│",
							se: "╯",
							s: "─",
							sw: "╰",
							w: "│",
						},
						hAlign: "middle",
					},
					`
${chalk.bold.yellowBright("The client is now connected to the database!")}`
				).stringify();

				console.log(chalk.bold.greenBright(DatabaseBoxHeader));
				console.log(chalk.bold.greenBright(DatabaseBox));
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
