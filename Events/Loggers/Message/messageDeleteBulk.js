// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Message/messageDeleteBulk.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, Message, Client } = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");
const DB = require("../../../Structures/Schemas/channelsDB"); //Make sure this path is correct

module.exports = {
	name: "messageDeleteBulk",
	path: "Message/messageDeleteBulk.js",
	/**
	 * @param {Message} messages
	 */
	async execute(messages) {
		const Data = await DB.findOne({
			GuildID: messages.first().guild.id,
		});
		if (!Data || !Data.logs.messageLogs) return;

		const logsChannel = messages
			.first()
			.guild.channels.cache.get(Data.logs.messageLogs);
		const logs = await messages.first().guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry

		const tooMuch = messages.size;
		const message = await messages.map((m) => m); // Maps the messages that were deleted
		const channel = messages.first().channel;
		const ID = Math.floor(Math.random() * 5485444) + 4000000;

		try {
			// The try/catch is because sometimes the transcript isnt created for more info ask me on discord
			const attachment = await discordTranscripts.generateFromMessages(
				message,
				channel,
				{
					// Creates the transcript
					returnBuffer: false,
					fileName: `transcript-${ID}.html`,
				}
			);

			const messageDeletedBulkEmbed = new MessageEmbed()
				.setColor("RED")
				.setTitle(`Multiple Messages Were Deleted`)
				.setDescription(
					`📘 ${tooMuch} messages in <#${
						messages.first().channelId
					}> was **deleted** by <@${log.executor.id}>.`
				)
				.setTimestamp()
				.setFooter({
					text: messages.first().guild.name,
				});

			logsChannel
				.send({ embeds: [messageDeletedBulkEmbed], files: [attachment] })
				.catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
		}
	},
};
