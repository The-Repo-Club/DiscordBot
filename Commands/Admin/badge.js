/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/badge.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 March 2022, 04:34:08 PM [GMT]
 *Last edited:
 *   Wed 23 March 2022, 05:38:40 PM [GMT]
 *
 *Description:
 *   Badge Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { MessageEmbed, CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/levelsDB"); //Make sure this path is correct
const { purple, red } = require("../../Structures/colors.json");
const ms = require("ms");

async function updateField(guild, type, user, badge, level) {
	field = `${type}.${badge}`;
	await DB.findOneAndUpdate(
		{ guildID: guild, userID: user },
		{
			[field]: level,
		},
		{
			new: true,
			upsert: true,
		}
	).catch((err) => console.log(err));
}

module.exports = {
	name: "badge",
	path: "Admin/badge.js",
	description: "Add a remove badges from a user.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "add",
			description: "Add a badge to a selected user",
			type: "SUB_COMMAND",
			options: [
				{
					name: "target",
					description: "The user on which the badge is added from.",
					type: "USER",
					require: true,
				},
				{
					name: "badge",
					description: "The type badge you wish to add the to target",
					type: "STRING",
					choices: [
						{
							name: "Bubble",
							value: "bubble",
						},
						{
							name: "Speaker",
							value: "speaker",
						},
						{
							name: "Stream",
							value: "stream",
						},
						{
							name: "Picture",
							value: "picture",
						},
						{
							name: "Like",
							value: "like",
						},
						{
							name: "Star",
							value: "star",
						},
						{
							name: "Boost",
							value: "boost",
						},
						{
							name: "Money",
							value: "money",
						},
						{
							name: "Bot",
							value: "bot",
						},
					],
				},
				{
					name: "level",
					description: "The level of badge you wish to add to the target",
					type: "STRING",
					choices: [
						{
							name: "Bronze",
							value: "bronze",
						},
						{
							name: "Silver",
							value: "sliver",
						},
						{
							name: "Gold",
							value: "gold",
						},
						{
							name: "Diamond",
							value: "diamond",
						},
					],
				},
			],
		},
		{
			name: "remove",
			description: "Remove a badge from a selected user.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "target",
					description: "The user on which the badge is removed from.",
					type: "USER",
					require: true,
				},
				{
					name: "badge",
					description: "The type badge you wish to remove the to target",
					type: "STRING",
					choices: [
						{
							name: "Bubble",
							value: "bubble",
						},
						{
							name: "Speaker",
							value: "speaker",
						},
						{
							name: "Stream",
							value: "stream",
						},
						{
							name: "Picture",
							value: "picture",
						},
						{
							name: "Like",
							value: "like",
						},
						{
							name: "Star",
							value: "star",
						},
						{
							name: "Boost",
							value: "boost",
						},
						{
							name: "Money",
							value: "money",
						},
						{
							name: "Bot",
							value: "bot",
						},
					],
				},
			],
		},
	],

	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const options = interaction.options;
		const { guild } = interaction;

		switch (options.getSubcommand()) {
			case "add":
				{
					const aTarget = options.getMember("target");
					const aBadge = options.getString("badge");
					const aLevel = options.getString("level");

					updateField(guild.id, "badges", aTarget.id, aBadge, aLevel);

					await interaction.reply({
						content: `Successfully added ${aLevel} ${aBadge} badge to ${aTarget}.`,
						ephemeral: true,
					});
				}
				break;
			case "remove":
				{
					const rTarget = options.getMember("target");
					const rBadge = options.getString("badge");

					updateField(guild.id, "badges", rTarget.id, rBadge, null);

					await interaction.reply({
						content: `Successfully removed ${rBadge} badge from ${rTarget}.`,
						ephemeral: true,
					});
				}
				break;
		}
	},
};
