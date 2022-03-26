/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Eco/join.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Thu 24 March 2022, 08:20:06 PM [GMT]
 *Last edited:
 *   Sat 26 March 2022, 09:50:48 AM [GMT]
 *
 *Description:
 *   join Eco System Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ecoSys
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const ecoSys = require("../../Systems/ecoSys");

module.exports = {
	name: "eco-join",
	path: "Eco/join.js",
	description: "Eco",
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { member, guild } = interaction;

		ecoSys
			.joinEcoSystem(member.id, guild.id)
			.then((msg) => {
				return interaction.reply({ content: ` ${member.user} has joined the eco system.` });
			})
			.catch((err) => {
				return interaction.reply({ content: `${member.user} you have already joined the eco system.`, ephemeral: true });
			});
	},
};
