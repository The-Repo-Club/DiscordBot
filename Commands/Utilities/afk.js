/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/afk.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 06:04:54 PM [GMT]
 *
 *Description:
 *   AFK Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, afkDB
 **/

const {
	CommandInteraction,
	Client,
	MessageEmbed,
	Message,
} = require("discord.js");
const afkSchema = require("../../Structures/Schemas/afkDB");

module.exports = {
	name: "afk",
	path: "Utilities/afk.js",
	description: "Set yourself afk!",
	options: [
		{
			name: "reason",
			description: "Reasoning why you went afk",
			type: "STRING",
			required: false,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 * @param {Message} message
	 */
	async execute(interaction, client) {
		const reason = interaction.options.getString("reason") || "Unspecified";

		const params = {
			Guild: interaction.guild.id,
			User: interaction.guild.id,
		};

		afkSchema.findOne({ params }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.delete();
				interaction.reply({
					content: `You are no longer AFK!`,
					ephemeral: true,
				});
			} else {
				new afkSchema({
					Guild: interaction.guild.id,
					User: interaction.user.id,
					Reason: reason,
					Date: Date.now(),
				}).save();
				interaction.reply({
					content: `You are now AFK for the reasoning of \`${reason}\``,
					ephemeral: true,
				});
			}
		});
	},
};
