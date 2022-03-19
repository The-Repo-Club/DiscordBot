/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/setup-server.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 16 March 2022, 08:49:34 PM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 01:48:23 AM [GMT]
 *
 *Description:
 *   Setup-Server Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, channelsDB
 **/

const { MessageEmbed, CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const { purple, red } = require("../../Structures/colors.json");
const ms = require("ms");

async function updateField(guild, type, field, channel) {
	field = `${type}.${field}`;
	await DB.findOneAndUpdate(
		{ GuildID: guild },
		{
			[field]: channel,
		},
		{
			new: true,
			upsert: true,
		}
	).catch((err) => console.log(err));
}

module.exports = {
	name: "server-setup",
	path: "Admin/server-setup.js",
	description: "Setup or reset the command channels for the server.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "logs",
			description: "Setup the server logs channels.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					description: "Select the type of log you would like to setup.",
					required: true,
					type: "STRING",
					choices: [
						{
							name: "Channel",
							value: "channel",
						},
						{
							name: "Events",
							value: "events",
						},
						{
							name: "Emoji",
							value: "emoji",
						},
						{
							name: "Guild",
							value: "guild",
						},
						{
							name: "JoinLeave",
							value: "joinLeave",
						},
						{
							name: "Member",
							value: "member",
						},
						{
							name: "Message",
							value: "message",
						},
						{
							name: "Role",
							value: "role",
						},
						{
							name: "Sticker",
							value: "sticker",
						},
						{
							name: "Thread",
							value: "thread",
						},
						{
							name: "User",
							value: "user",
						},
						{
							name: "Voice",
							value: "voice",
						},
					],
				},
				{
					name: "channel",
					description: "Select the channel to send them logs to.",
					required: true,
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
				},
			],
		},
		{
			name: "roles",
			description: "Setup the server roles.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					description: "Select the type of role you would like to setup.",
					required: true,
					type: "STRING",
					choices: [
						{
							name: "Bots",
							value: "bots",
						},
						{
							name: "Partners",
							value: "partners",
						},
						{
							name: "Pro",
							value: "pro",
						},
						{
							name: "Supporters",
							value: "supporters",
						},
						{
							name: "Helpers",
							value: "helpers",
						},
						{
							name: "Welcome",
							value: "welcome",
						},
					],
				},
				{
					name: "role",
					description: "Select the role to give to that type.",
					required: true,
					type: "ROLE",
				},
			],
		},
		{
			name: "status",
			description: "Setup the server status channels.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					description: "Select the type of status you would like to setup.",
					required: true,
					type: "STRING",
					choices: [
						{
							name: "Members",
							value: "members",
						},
						{
							name: "Bots",
							value: "bots",
						},
						{
							name: "Roles",
							value: "roles",
						},
						{
							name: "Channels",
							value: "channels",
						},
						{
							name: "Premiums",
							value: "premiums",
						},
					],
				},
				{
					name: "channel",
					description: "Select the role to give to that type.",
					required: true,
					type: "CHANNEL",
					channelTypes: ["GUILD_STAGE_VOICE"],
				},
			],
		},
		{
			name: "commands",
			description: "Setup the server commands channel.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "channel",
					description: "Select the channel to run server commands in.",
					required: true,
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
				},
			],
		},
		{
			name: "announcements",
			description: "Setup the server announcements channel.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "channel",
					description: "Select the channel to run server announcements in.",
					required: true,
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
				},
			],
		},
		{
			name: "reset",
			description: "Reset all of the channels.",
			type: "SUB_COMMAND",
		},
	],

	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		try {
			const options = interaction.options;
			const { guild } = interaction;

			switch (options.getSubcommand()) {
				case "announcements":
					{
						const announcementsChannel = options.getChannel("channel");

						await DB.findOneAndUpdate(
							{ GuildID: guild.id },
							{
								announcementsChannelID: announcementsChannel.id,
							},
							{
								new: true,
								upsert: true,
							}
						).catch((err) => console.log(err));

						const channelSetup = new MessageEmbed().setDescription("✅ | Successfully setup the server announcements channel.").setColor(purple);

						await guild.channels.cache
							.get(announcementsChannel.id)
							.send({ embeds: [channelSetup] })
							.then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, ms("5s"));
							});

						await interaction.reply({
							content: "Successfully setup the Announcements Channel.",
							ephemeral: true,
						});
					}
					break;
				case "logs":
					{
						const LType = options.getString("type");
						const LChannel = options.getChannel("channel");

						const channelSetup = new MessageEmbed().setDescription(`✅ | Successfully setup the ${LType} logs.`).setColor(purple);

						updateField(guild.id, "logs", LType + "Logs", LChannel);

						await guild.channels.cache
							.get(LChannel.id)
							.send({ embeds: [channelSetup] })
							.then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, ms("5s"));
							});

						await interaction.reply({
							content: `Successfully setup the ${LChannel} logs.`,
							ephemeral: true,
						});
					}
					break;
				case "commands":
					{
						const commandChannel = options.getChannel("channel");

						await DB.findOneAndUpdate(
							{ GuildID: guild.id },
							{
								commandsChannelID: commandChannel.id,
							},
							{
								new: true,
								upsert: true,
							}
						).catch((err) => console.log(err));

						const channelSetup = new MessageEmbed().setDescription("✅ | Successfully setup the server commands channel.").setColor(purple);

						await guild.channels.cache
							.get(commandChannel.id)
							.send({ embeds: [channelSetup] })
							.then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, ms("5s"));
							});

						await interaction.reply({
							content: "Successfully setup the Commands Channel.",
							ephemeral: true,
						});
					}
					break;
				case "roles":
					{
						const RType = options.getString("type");
						const RRole = options.getRole("role");

						const channelSetup = new MessageEmbed().setDescription(`✅ | Successfully setup the ${RType} role.`).setColor(purple);

						updateField(guild.id, RType + "ID", RRole);

						await interaction.reply({
							embeds: [channelSetup],
							ephemeral: true,
						});
					}
					break;
				case "status":
					{
						const LType = options.getString("type");
						const LChannel = options.getChannel("channel");

						updateField(guild.id, "status", LType + "ID", LChannel);

						await interaction.reply({
							content: `Successfully setup the ${LChannel} status channel.`,
							ephemeral: true,
						});
					}
					break;
				case "reset":
					{
						const LogsReset = new MessageEmbed().setDescription("✅ | Successfully reset the logging channels.").setColor(purple);
						DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
							if (err) throw err;
							if (!data)
								return interaction.reply({
									content: "There is no data to delete",
								});
							return interaction.reply({ embeds: [LogsReset], fetchReply: true }).then((msg) => {
								setTimeout(() => msg.delete(), ms("5s"));
							});
						});
					}
					return;
			}
		} catch (error) {
			if (error.message === "Missing Access") {
				return interaction.reply({
					embeds: [new MessageEmbed().setColor(red).setDescription(`❌ The bot does not have access to this channel.`)],
				});
			} else {
				return interaction.reply({
					embeds: [new MessageEmbed().setColor(red).setDescription(`❌ An error occurred. \n\n \`\`\`${error}\`\`\``)],
				});
			}
		}
	},
};
