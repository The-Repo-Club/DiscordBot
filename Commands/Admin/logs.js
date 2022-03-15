/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/logs.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Mon 14 March 2022, 10:09:24 PM [GMT]
 *
 *Description:
 *   Logs Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, channelsDB
 **/

const { MessageEmbed, CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const ms = require("ms");

async function updateField(guild, field, channel) {
	field = `logs.${field}`;
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
	name: "logs",
	path: "Admin/logs.js",
	description: "Setup or reset the logs channels.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "setup",
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
			name: "reset",
			description: "Reset the logs channel.",
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
				case "setup":
					{
						const LType = options.getString("type");
						const LChannel = options.getChannel("channel");

						const LogsSetup = new MessageEmbed()
							.setDescription(`✅ | Successfully setup the ${LType} logs.`)
							.setColor("#43b581");

						updateField(guild.id, LType + "Logs", LChannel);

						await guild.channels.cache
							.get(LChannel.id)
							.send({ embeds: [LogsSetup] })
							.then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, ms("5s"));
							});

						await interaction.reply({
							content: `Successfully setup the ${LType} logs.`,
							ephemeral: true,
						});
					}
					break;
				case "reset":
					{
						const LogsReset = new MessageEmbed()
							.setDescription("✅ | Successfully reset the logging channels.")
							.setColor("#43b581");
						DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
							if (err) throw err;
							if (!data)
								return interaction.reply({
									content: "There is no data to delete",
								});
							return interaction
								.reply({ embeds: [LogsReset], fetchReply: true })
								.then((msg) => {
									setTimeout(() => msg.delete(), ms("5s"));
								});
						});
					}
					return;
			}
		} catch (error) {
			if (error.message === "Missing Access") {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor("RED")
							.setDescription(
								`❌ The bot does not have access to this channel.`
							),
					],
				});
			} else {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor("RED")
							.setDescription(
								`❌ An error occurred. \n\n \`\`\`${error}\`\`\``
							),
					],
				});
			}
		}
	},
};
