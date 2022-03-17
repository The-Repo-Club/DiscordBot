/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Suggestions/suggestion.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:17:15 PM [GMT]
 *
 *Description:
 *   Suggestion Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, suggestDB, suggestSetupDB
 **/

const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const suggestSetupDB = require("../../Structures/Schemas/suggestSetupDB"); //Make sure this path is correct
const suggestDB = require("../../Structures/Schemas/suggestDB"); //Make sure this path is correct
const { red, green, purple } = require("../../Structures/colors.json");

module.exports = {
	name: "suggestion",
	path: "Suggestions/suggestion.js",
	description: "Set up the channel to where suggestions are sent.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "accept",
			description: "Accept a suggestion.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "message-id",
					description: "The message id of the suggestion you want to accept.",
					type: "STRING",
					required: true,
				},
				{
					name: "reason",
					description: "The reason why this suggestion was accepted.",
					type: "STRING",
					required: true,
				},
			],
		},
		{
			name: "decline",
			description: "Decline a suggestion.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "message-id",
					description: "The message id of the suggestion you want to decline.",
					type: "STRING",
					required: true,
				},
				{
					name: "reason",
					description: "The reason why this suggestion was declined.",
					type: "STRING",
					required: true,
				},
			],
		},
		{
			name: "pending",
			description: "Set a suggestion back to pending.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "message-id",
					description: "The message id of the suggestion you want to reset.",
					type: "STRING",
					required: true,
				},
				{
					name: "reason",
					description: "The reason why this suggestion was reset.",
					type: "STRING",
					required: true,
				},
			],
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const messageId = interaction.options.getString("message-id");
		const reason = interaction.options.getString("reason");

		const suggestionsSetup = await suggestSetupDB.findOne({
			GuildID: interaction.guildId,
		});
		var suggestionsChannel;
		var acceptedChannel;
		var declinedChannel;

		if (!suggestionsSetup) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(red)
						.setDescription(
							`❌ This server has not setup the suggestion system.`
						),
				],
			});
		} else {
			suggestionsChannel = interaction.guild.channels.cache.get(
				suggestionsSetup.ChannelID
			);
			acceptedChannel = interaction.guild.channels.cache.get(
				suggestionsSetup.AcceptID
			);
			declinedChannel = interaction.guild.channels.cache.get(
				suggestionsSetup.DeclineID
			);
		}

		const suggestion = await suggestDB.findOne({
			GuildID: interaction.guild.id,
			MessageID: messageId,
		});

		if (!suggestion)
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(red)
						.setDescription(
							`❌ This suggestion was not found in the database.`
						),
				],
			});

		const message = await suggestionsChannel.messages.fetch(messageId);

		if (!message)
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(red)
						.setDescription(`❌ This message was not found.`),
				],
			});

		const Embed = message.embeds[0];
		if (!Embed) return;

		switch (interaction.options.getSubcommand()) {
			case "accept":
				Embed.fields[1] = { name: "Status", value: "Accepted", inline: true };
				Embed.fields[2] = { name: "Reason", value: `${reason}`, inline: true };
				message.edit({
					embeds: [Embed.setColor(green)],
					content: `<@${suggestion.MemberID}>`,
				});

				const acceptedMessage = new MessageEmbed()
					.setColor(green)
					.setTitle("Suggestion 💡")
					.setDescription(`Suggestion was accepted ✅`)
					.addFields(
						{
							name: "Suggestion",
							value: `[link](${message.url})`,
							inline: true,
						},
						{ name: "Reason", value: `${reason}`, inline: true }
					);
				try {
					await acceptedChannel
						.send({ embeds: [acceptedMessage] })
						.catch(() => null);
				} catch (error) {
					return interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor(red)
								.setDescription(
									`❌ This accepted channel was not found in the database.`
								),
						],
						ephemeral: true,
					});
				}

				if (suggestion.DM) {
					const member = client.users.cache.get(suggestion.MemberID);

					member
						.send({
							embeds: [
								new MessageEmbed()
									.setColor(green)
									.setTitle("Suggestion 💡")
									.setDescription(`Your suggestion was accepted ✅`)
									.addFields(
										{
											name: "Suggestion",
											value: `[link](${message.url})`,
											inline: true,
										},
										{
											name: "Guild",
											value: `${interaction.guild.name}`,
											inline: true,
										},
										{ name: "Reason", value: `${reason}`, inline: true }
									),
							],
						})
						.catch(() => null);
				}
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor(green)
							.setDescription(`[Suggestion](${message.url}) was accepted ✅`),
					],
					ephemeral: true,
				});

			case "decline":
				Embed.fields[1] = { name: "Status", value: "Declined", inline: true };
				Embed.fields[2] = { name: "Reason", value: `${reason}`, inline: true };
				message.edit({
					embeds: [Embed.setColor(red)],
					content: `<@${suggestion.MemberID}>`,
				});

				const declinedMessage = new MessageEmbed()
					.setColor(red)
					.setTitle("Suggestion 💡")
					.setDescription(`Suggestion was declined. ❎`)
					.addFields(
						{
							name: "Suggestion",
							value: `[link](${message.url})`,
							inline: true,
						},
						{ name: "Reason", value: `${reason}`, inline: true }
					);

				try {
					await declinedChannel
						.send({ embeds: [declinedMessage] })
						.catch(() => null);
				} catch (error) {
					return interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor(red)
								.setDescription(
									`❌ This declined channel was not found in the database.`
								),
						],
						ephemeral: true,
					});
				}

				if (suggestion.DM) {
					const member = client.users.cache.get(suggestion.MemberID);
					member
						.send({
							embeds: [
								new MessageEmbed()
									.setColor(red)
									.setTitle("Suggestion 💡")
									.setDescription(`Your suggestion was declined. ❎`)
									.addFields(
										{
											name: "Suggestion",
											value: `[link](${message.url})`,
											inline: true,
										},
										{
											name: "Guild",
											value: `${interaction.guild.name}`,
											inline: true,
										},
										{ name: "Reason", value: `${reason}`, inline: true }
									),
							],
						})
						.catch(() => null);
				}
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor(red)
							.setDescription(`[Suggestion](${message.url}) was declined ❎`),
					],
					ephemeral: true,
				});
			case "pending":
				Embed.fields[1] = { name: "Status", value: "🕐 Pending", inline: true };
				Embed.fields[2] = { name: "Reason", value: `${reason}`, inline: true };
				message.edit({
					embeds: [Embed.setColor(purple)],
					content: `<@${suggestion.MemberID}>`,
				});

				if (suggestion.DM) {
					const member = client.users.cache.get(suggestion.MemberID);
					member
						.send({
							embeds: [
								new MessageEmbed()
									.setColor(purple)
									.setTitle("Suggestion 💡")
									.setDescription(`Your suggestion was set back to pending. 🕐`)
									.addFields(
										{
											name: "Suggestion",
											value: `[link](${message.url})`,
											inline: true,
										},
										{
											name: "Guild",
											value: `${interaction.guild.name}`,
											inline: true,
										}
									),
							],
						})
						.catch(() => null);
				}
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor(purple)
							.setDescription(`[Suggestion](${message.url}) is 🕐 Pending`),
					],
					ephemeral: true,
				});
		}
	},
};
