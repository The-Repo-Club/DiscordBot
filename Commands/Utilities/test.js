/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/test.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 06:07:27 PM [GMT]
 *
 *Description:
 *   Test Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "test",
	path: "Utilities/test.js",
	description: "Shows the latest changes in the bot.",
	async execute(interaction) {
		const row = new MessageActionRow();
		row.addComponents(new MessageButton().setCustomId("Hello").setLabel("Hello").setStyle("DANGER"), new MessageButton().setCustomId("Bye").setLabel("Bye").setStyle("DANGER"));

		interaction.reply({ components: [row], ephemeral: true });
	},
};
