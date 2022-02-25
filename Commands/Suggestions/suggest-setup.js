const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const DB = require("../../Structures/Schemas/suggestSetupDB"); //Make sure this path is correct

module.exports = {
	name: "suggest-setup",
	description: "Set up the channel to where suggestions are sent.",
	usage: "/suggest-setup",
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
									.setColor("AQUA")
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
										.setColor("DARK_RED")
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
									)
									.setFooter({
										text: "This system was created by The-Repo-Club#3623",
									}),
							],
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
								.setColor("RED")
								.setDescription(
									`❌ This server has not setup the suggestion system.`
								),
						],
					});

				const messages = new MessageEmbed().setColor("GREEN");
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
