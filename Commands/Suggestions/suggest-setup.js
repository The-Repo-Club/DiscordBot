/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Suggestions/suggest-setup.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:15:35 PM [GMT]
 *
 *Description:
 *   Suggest-Setup Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, suggestSetupDB
 **/

const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const DB = require("../../Structures/Schemas/suggestSetupDB"); //Make sure this path is correct
const { red, green, cyan } = require("../../Structures/colors.json");

module.exports = {
	name: "suggest-setup",
	path: "Suggestions/suggest-setup.js",
	description: "Set up the channel to where suggestions are sent.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "set",
			description: "Set the channel where suggestions will be sent.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					description: "The type of channel you would like to set.",
					type: "STRING",
					required: true,
					choices: [
						{
							name: "Suggestion",
							value: "Suggestion",
						},
						{
							name: "Accepted",
							value: "Accepted",
						},
						{
							name: "Declined",
							value: "Declined",
						},
					],
				},
				{
					name: "channel",
					description: "The channel where suggestions will be sent.",
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
					required: true,
				},
			],
		},
		{
			name: "current-channel",
			description: "Display the current suggestions channel.",
			type: "SUB_COMMAND",
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		switch (interaction.options.getSubcommand()) {
			case "set":
				const channel = interaction.options.getChannel("channel");
				const type = interaction.options.getString("type");

				try {
					const suggestion = await DB.findOne({
						GuildID: interaction.guild.id,
					});

					let acceptID;
					let declineID;
					let channelID;
					if (suggestion) {
						if (type === "Accepted") {
							acceptID = channel.id;
							declineID = suggestion.DeclineID;
							channelID = suggestion.ChannelID;
						} else if (type === "Declined") {
							acceptID = suggestion.AcceptID;
							declineID = channel.id;
							channelID = suggestion.ChannelID;
						} else {
							acceptID = suggestion.AcceptID;
							declineID = suggestion.DeclineID;
							channelID = channel.id;
						}
					} else {
						if (type === "Accepted") {
							acceptID = channel.id;
							declineID = null;
							channelID = null;
						} else if (type === "Declined") {
							acceptID = null;
							declineID = channel.id;
							channelID = null;
						} else {
							acceptID = null;
							declineID = null;
							channelID = channel.id;
						}
					}
					await channel
						.send({
							embeds: [
								new MessageEmbed()
									.setColor(cyan)
									.setDescription(
										`✅ This channel has been set as a ${type} channel.`
									),
							],
							ephemeral: true,
						})
						.then(async () => {
							await DB.findOneAndUpdate(
								{ GuildID: interaction.guild.id },
								{
									AcceptID: acceptID,
									DeclineID: declineID,
									ChannelID: channelID,
								},
								{ new: true, upsert: true }
							);
							interaction.reply({
								embeds: [
									new MessageEmbed()
										.setColor(red)
										.setDescription(
											`✅ ${channel} has successfully been set as the ${type} channel for ${interaction.guild.name}.`
										),
								],
								ephemeral: true,
							});
						});
				} catch (error) {
					if (error.message === "Missing Access") {
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setColor(red)
									.setDescription(
										`❌ The bot does not have access to this channel.`
									),
							],
							ephemeral: true,
						});
					} else {
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setColor(red)
									.setDescription(
										`❌ An error occurred. \n\n \`\`\`${error}\`\`\``
									)
									.setFooter({
										text: "This system was created by TheRepo.Club#3623",
									}),
							],
							ephemeral: true,
						});
					}
				}
				break;
			case "current-channel":
				const suggestion = await DB.findOne({ GuildID: interaction.guild.id });

				if (!suggestion)
					return interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor(red)
								.setDescription(
									`❌ This server has not setup the suggestion system.`
								),
						],
						ephemeral: true,
					});

				const messages = new MessageEmbed().setColor(green);
				if (suggestion.AcceptID) {
					messages.addFields({
						name: "The Accepted channel is currently set to",
						value: `<#${suggestion.AcceptID}>`,
						inline: true,
					});
				}
				if (suggestion.DeclineID) {
					messages.addFields({
						name: "The Declined channel is currently set to",
						value: `<#${suggestion.DeclineID}>`,
						inline: true,
					});
				}
				if (suggestion.ChannelID) {
					messages.addFields({
						name: "The Suggestion channel is currently set to",
						value: `<#${suggestion.ChannelID}>`,
						inline: true,
					});
				}

				return interaction.reply({
					embeds: [messages],
					ephemeral: true,
				});
		}
	},
};
