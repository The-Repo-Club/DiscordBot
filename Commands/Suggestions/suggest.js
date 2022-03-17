/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Suggestions/suggest.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:17:01 PM [GMT]
 *
 *Description:
 *   Suggest Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, suggestDB, suggestSetupDB
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const suggestDB = require("../../Structures/Schemas/suggestDB"); //Make sure this path is correct
const suggestSetupDB = require("../../Structures/Schemas/suggestSetupDB"); //Make sure this path is correct
const { red, purple } = require("../../Structures/colors.json");

module.exports = {
	name: "suggest",
	path: "Suggestions/suggest.js",
	description: "Create a suggestion.",
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
		}

		const type = options.getString("type");
		const suggestion = options.getString("suggestion");
		const DM = options.getBoolean("dm");

		const Embed = new MessageEmbed()
			.setColor(purple)
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

			M.react("<:accepted:947970636310011945>");
			M.react("<:declined:947970620648468490>");

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
						.setColor(purple)
						.setDescription(
							`✅ Your [suggestion](${M.url}) was successfully created and sent to ${suggestionsChannel}`
						)
						.setFooter({
							text: "This system was created by TheRepo.Club#3623",
						}),
				],
				ephemeral: true,
			});
		} catch (err) {
			console.log(err);
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(red)
						.setDescription(`❌ An error occurred.`),
				],
			});
		}
	},
};
