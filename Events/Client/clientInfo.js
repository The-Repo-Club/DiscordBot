const chalk = require("chalk");
const Box = require("cli-box");

const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
	name: "ready",
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
${chalk.bold.blueBright("Client Details")} :: ${chalk.redBright(
					client.user.tag
				)}
${chalk.bold.blueBright("Guilds Count")} :: ${chalk.redBright(
					client.guilds.cache.size
				)}
${chalk.bold.blueBright("User Count")}:: ${chalk.redBright(
					client.users.cache.size
				)}
${chalk.bold.blueBright("NodeJS Version")} :: ${chalk.redBright(
					process.version
				)}
`
			).stringify();

			console.log(chalk.bold.greenBright(ClientBoxHeader));
			console.log(chalk.bold.greenBright(ClientBox));
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
					`${chalk.bold.yellowBright(
						"The client is now connected to the database!"
					)}`
				).stringify();

				console.log(chalk.bold.greenBright(DatabaseBoxHeader));
				console.log(chalk.bold.greenBright(DatabaseBox));
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
