// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Suggestions/suggest.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { CommandInteraction, MessageEmbed } = require("discord.js");
const suggestDB = require("../../Structures/Schemas/suggestDB"); //Make sure this path is correct
const suggestSetupDB = require("../../Structures/Schemas/suggestSetupDB"); //Make sure this path is correct

module.exports = {
	name: "suggest",
	description: "Create a suggestion.",
	usage: "/suggest",
	options: [
		{
			name: "type",
			description: "Select a type.",
			required: true,
			type: "STRING",
			choices: [
				{
					name: "Command",
					value: "Command",
				},
				{
					name: "Event",
					value: "Event",
				},
				{
					name: "System",
					value: "System",
				},
				{
					name: "Other",
					value: "Other",
				},
			],
		},
		{
			name: "suggestion",
			description: "Describe your suggestion.",
			type: "STRING",
			required: true,
		},
		{
			name: "dm",
			description:
				"Set whether the bot will DM you, once your suggestion has been declined or accepted.",
			type: "BOOLEAN",
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { options, guildId, member, user } = interaction;

		const suggestionsSetup = await suggestSetupDB.findOne({ GuildID: guildId });
		var suggestionsChannel;

		if (!suggestionsSetup) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription(
							`❌ This server has not setup the suggestion system.`
						),
				],
			});
		} else {
			suggestionsChannel = interaction.guild.channels.cache.get(
				suggestionsSetup.ChannelID
			);
		}

		const type = options.getString("type");
		const suggestion = options.getString("suggestion");
		const DM = options.getBoolean("dm");

		const Embed = new MessageEmbed()
			.setColor("#8130D7")
			.setAuthor({
				name: `${user.tag}`,
				iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
			})
			.setDescription(`**Suggestion:**\n${suggestion}`)
			.addFields(
				{ name: "Type", value: type, inline: true },
				{ name: "Status", value: "🕐 Pending", inline: true }
			);

		try {
			const M = await suggestionsChannel.send({ embeds: [Embed] });

			M.react("<:accepted:946447476355919922>");
			M.react("<:declined:946447476460769300>");

			await suggestDB.create({
				GuildID: guildId,
				MessageID: M.id,
				Details: [
					{
						MemberID: member.id,
						Type: type,
						Suggestion: suggestion,
					},
				],
				MemberID: member.id,
				DM: DM,
			});
			interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("#8130D7")
						.setDescription(
							`✅ Your [suggestion](${M.url}) was successfully created and sent to ${suggestionsChannel}`
						)
						.setFooter({
							text: "This system was created by The-Repo-Club#3623",
						}),
				],
				ephemeral: true,
			});
		} catch (err) {
			console.log(err);
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription(`❌ An error occurred.`),
				],
			});
		}
	},
};
