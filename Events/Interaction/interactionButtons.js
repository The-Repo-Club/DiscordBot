/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Interaction/interactionButtons.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sat 19 March 2022, 11:49:48 AM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 11:49:48 AM [GMT]
 *
 *Description:
 *   interactionButtons Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js,
 **/

const { ButtonInteraction } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	path: "Interaction/interactionButtons.js",
	/**
	 * @param {ButtonInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
		const Button = client.buttons.get(interaction.customId);
		if (!Button) return;

		if (Button.permission && !interaction.member.permissions.has(Button.permission)) return interaction.reply({ content: "🟥 You are missing permissions to use that button.", ephemeral: true });

		if (Button.ownerOnly && !interaction.member.id !== interaction.guild.ownerId) return interaction.reply({ content: "🟥 Sorry only the owner of the guild can use that button.", ephemeral: true });

		Button.execute(interaction, client);
	},
};
