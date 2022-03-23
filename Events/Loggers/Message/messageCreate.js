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
const ms = require("ms");
Levels.setURL(Database);

module.exports = {
	name: "messageCreate",
	path: "Message/messageCreate.js",
	/**
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot || !message.guildId) return;

		const { member } = message;

		const DB = require("../../../Structures/Schemas/channelsDB"); //Make sure this path is correct

		const Data = await DB.findOne({
			GuildID: message.guild.id,
		});

		if (Data && Data.commandsChannelID === message.channel.id && message.author.id !== message.guild.ownerId) {
			message.channel
				.send({
					content: `${message.author} this channel is for commands only.`,
				})
				.then((msg) => {
					setTimeout(() => msg.delete(), ms("5s"));
				});
			return message.delete();
		}

		if (message.content.includes(message.guild.ownerId))
			message.channel
				.send({
					content: `${message.author} don't tag the guild owner.`,
				})
				.then(async (msg) => {
					message.delete();
					setTimeout(() => msg.delete(), ms("5s"));
					await member.timeout(ms("1 hour"), "don't tag the guild owner");
				});

		const user = await Levels.fetch(message.author.id, message.guildId);

		if (Date.now() - user.lastUpdated > ms("5 minutes")) {
			const min = 25;
			const max = 300;
			const xp = Math.floor(Math.random() * (max - min + 1) + min);
			const hasLeveledUp = await Levels.appendXp(message.author.id, message.guildId, xp);
			if (hasLeveledUp) {
				if (!message.guild.systemChannel) return message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);

				return message.guild.systemChannel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
			}
		}
	},
};
