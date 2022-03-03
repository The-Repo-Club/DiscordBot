// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/ping.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client } = require("discord.js");

module.exports = {
	name: "emit",
	description: "Emit an event.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "application",
			description: "Event to pass to emit",
			type: "STRING",
			choices: [
				{
					name: "applicationCommandCreate",
					value: "applicationCommandCreate",
				},
				{
					name: "applicationCommandDelete",
					value: "applicationCommandDelete",
				},
				{
					name: "applicationCommandUpdate",
					value: "applicationCommandUpdate",
				},
			],
		},
		{
			name: "channel",
			description: "Event to pass to emit",
			type: "STRING",
			choices: [
				{
					name: "channelCreate",
					value: "channelCreate",
				},
				{
					name: "channelDelete",
					value: "channelDelete",
				},
				{
					name: "channelPinsUpdate",
					value: "channelPinsUpdate",
				},
				{
					name: "channelUpdate",
					value: "channelUpdate",
				},
			],
		},
		{
			name: "emoji",
			description: "Event to pass to emit",
			type: "STRING",
			choices: [
				{
					name: "emojiCreate",
					value: "emojiCreate",
				},
				{
					name: "emojiDelete",
					value: "emojiDelete",
				},
				{
					name: "emojiUpdate",
					value: "emojiUpdate",
				},
			],
		},
		{
			name: "guild",
			description: "Event to pass to emit",
			type: "STRING",
			choices: [
				{
					name: "guildBanAdd",
					value: "guildBanAdd",
				},
				{
					name: "guildBanRemove",
					value: "guildBanRemove",
				},
				{
					name: "guildCreate",
					value: "guildCreate",
				},
				{
					name: "guildDelete",
					value: "guildDelete",
				},
				{
					name: "guildIntegrationsUpdate",
					value: "guildIntegrationsUpdate",
				},
				{
					name: "guildMemberAdd",
					value: "guildMemberAdd",
				},
				{
					name: "guildMemberAvailable",
					value: "guildMemberAvailable",
				},
				{
					name: "guildMemberRemove",
					value: "guildMemberRemove",
				},
				{
					name: "guildMembersChunk",
					value: "guildMembersChunk",
				},
				{
					name: "guildMemberUpdate",
					value: "guildMemberUpdate",
				},
				{
					name: "guildUnavailable",
					value: "guildUnavailable",
				},
				{
					name: "guildUpdate",
					value: "guildUpdate",
				},
			],
		},
		{
			name: "message",
			description: "Event to pass to emit",
			type: "STRING",
			choices: [
				{
					name: "messageCreate",
					value: "messageCreate",
				},
				{
					name: "messageDelete",
					value: "messageDelete",
				},
				{
					name: "messageDeleteBulk",
					value: "messageDeleteBulk",
				},
				{
					name: "messageReactionAdd",
					value: "messageReactionAdd",
				},
				{
					name: "messageReactionRemove",
					value: "messageReactionRemove",
				},
				{
					name: "messageReactionRemoveAll",
					value: "messageReactionRemoveAll",
				},
				{
					name: "messageReactionRemoveEmoji",
					value: "messageReactionRemoveEmoji",
				},
				{
					name: "messageUpdate",
					value: "messageUpdate",
				},
			],
		},
		{
			name: "other",
			description: "Event to pass to emit",
			type: "STRING",
			choices: [
				{
					name: "interactionCreate",
					value: "interactionCreate",
				},
				{
					name: "invalidRequestWarning",
					value: "invalidRequestWarning",
				},
				{
					name: "inviteCreate",
					value: "inviteCreate",
				},
				{
					name: "inviteDelete",
					value: "inviteDelete",
				},

				{
					name: "presenceUpdate",
					value: "presenceUpdate",
				},
				{
					name: "rateLimit",
					value: "rateLimit",
				},
				{
					name: "roleCreate",
					value: "roleCreate",
				},
				{
					name: "roleDelete",
					value: "roleDelete",
				},
				{
					name: "roleUpdate",
					value: "roleUpdate",
				},
				{
					name: "stageInstanceCreate",
					value: "stageInstanceCreate",
				},
				{
					name: "stageInstanceDelete",
					value: "stageInstanceDelete",
				},
				{
					name: "stageInstanceUpdate",
					value: "stageInstanceUpdate",
				},
				{
					name: "stickerCreate",
					value: "stickerCreate",
				},
				{
					name: "stickerDelete",
					value: "stickerDelete",
				},
				{
					name: "stickerUpdate",
					value: "stickerUpdate",
				},
				{
					name: "threadCreate",
					value: "threadCreate",
				},
				{
					name: "threadDelete",
					value: "threadDelete",
				},
				{
					name: "threadListSync",
					value: "threadListSync",
				},
				{
					name: "threadMembersUpdate",
					value: "threadMembersUpdate",
				},
				{
					name: "threadMemberUpdate",
					value: "threadMemberUpdate",
				},
				{
					name: "threadUpdate",
					value: "threadUpdate",
				},
				{
					name: "typingStart",
					value: "typingStart",
				},
				{
					name: "userUpdate",
					value: "userUpdate",
				},
				{
					name: "voiceStateUpdate",
					value: "voiceStateUpdate",
				},
			],
		},
	],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	execute(interaction, client) {
		const application = interaction.options.getString("application");
		const channel = interaction.options.getString("channel");
		const emoji = interaction.options.getString("emoji");
		const guild = interaction.options.getString("guild");
		const message = interaction.options.getString("message");
		const other = interaction.options.getString("other");

		if (application) {
			client.emit(application, interaction.member);
			interaction.reply({ content: "Event Emitted", ephemeral: true });
		}
		if (channel) {
			client.emit(channel, interaction.member);
			interaction.reply({ content: "Event Emitted", ephemeral: true });
		}
		if (emoji) {
			client.emit(emoji, interaction.member);
			interaction.reply({ content: "Event Emitted", ephemeral: true });
		}
		if (guild) {
			client.emit(guild, interaction.member);
			interaction.reply({ content: "Event Emitted", ephemeral: true });
		}
		if (message) {
			client.emit(message, interaction.member);
			interaction.reply({ content: "Event Emitted", ephemeral: true });
		}
		if (other) {
			client.emit(other, interaction.member);
			interaction.reply({ content: "Event Emitted", ephemeral: true });
		}
	},
};
