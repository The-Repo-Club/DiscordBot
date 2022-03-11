// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/apply.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require('discord-modals')


module.exports = {
	name: "apply",
	path: "Utilities/apply.js",
	description: "Apply for staff position.",
	required: true,
	options: [
		{
			name: "position",
			description: "Select the position to apply for.",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "Admin",
					value: "Admin",
				},
				{
					name: "Moderator",
					value: "Moderator",
				},
				{
					name: "Helper",
					value: "Helper",
				},
			],
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const position = interaction.options.getString("position");

    client.position = position;

		const modal = new Modal()
			.setCustomId("application")
			.setTitle(`${position} Application`)
			.addComponents(
				new TextInputComponent()
					.setCustomId("gender")
					.setLabel("What is your gender?")
					.setStyle("SHORT")
					.setMinLength(4)
					.setMaxLength(6)
					.setPlaceholder("Male or Female")
					.setRequired(true),
				new TextInputComponent()
					.setCustomId("age")
					.setLabel("What is your age?")
					.setStyle("SHORT")
					.setMinLength(2)
					.setMaxLength(2)
					.setPlaceholder("Must be 13 or above")
					.setRequired(true),
				new TextInputComponent()
					.setCustomId("answer")
					.setLabel(`Why do you want to be a ${position}?`)
					.setStyle("LONG")
					.setMinLength(15)
					.setMaxLength(200)
					.setPlaceholder("Answer in brief.")
					.setRequired(true)
			);

		showModal(modal, {
			client: client,
			interaction: interaction,
		});
	},
};
