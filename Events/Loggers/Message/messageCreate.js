// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Message/messageCreate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { Message } = require("discord.js");
const Levels = require("../../../Systems/levelsSys");
const { Database } = require("../../../Structures/config.json");
Levels.setURL(Database);

module.exports = {
	name: "messageCreate",
	path: "Message/messageCreate.js",
	/**
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot || !message.guildId) return;

		const min = 15;
		const max = 30;
		const xp = Math.floor(Math.random() * (max - min + 1) + min);
		const hasLeveledUp = await Levels.appendXp(message.author.id, message.guildId, xp);
		if (hasLeveledUp) {
			const user = await Levels.fetch(message.author.id, message.guildId);

			if (!message.guild.systemChannel) return message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);

			return message.guild.systemChannel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
		}
	},
};
