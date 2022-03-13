const { join } = require("path");

const BASE_PATH = ".";

module.exports = {
	home: join(__dirname, BASE_PATH, "index.ejs"),
	guild: join(__dirname, BASE_PATH, "guild.ejs"),
	dashboard: join(__dirname, BASE_PATH, "dashboard.ejs"),
	commands: join(__dirname, BASE_PATH, "commands.ejs"),
	updates: join(__dirname, BASE_PATH, "updates.ejs"),
	levels: join(__dirname, BASE_PATH, "levels.ejs"),
	404: join(__dirname, BASE_PATH, "404.ejs"),
};
