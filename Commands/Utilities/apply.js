// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/apply.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require("discord-modals");

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
					name: "Moderator",
					value: "Moderator",
				},
				{
					name: "Developer",
					value: "Developer",
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

		const modal = new Modal();
		switch (position) {
			case "Moderator":
				modal
					.setCustomId("mod_application")
					.setTitle(`Moderator Application`)
					.addComponents(
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
							.setLabel("Why do you want to be a Moderator?")
							.setStyle("LONG")
							.setMinLength(15)
							.setMaxLength(200)
							.setPlaceholder("Answer in 15 - 200 chars.")
							.setRequired(true),
						new TextInputComponent()
							.setCustomId("hours")
							.setLabel("How many hours you can moderate?")
							.setStyle("SHORT")
							.setMinLength(2)
							.setMaxLength(22)
							.setPlaceholder("How many hours you can moderate?")
							.setRequired(true),
						new TextInputComponent()
							.setCustomId("experience")
							.setLabel("Do you have any past experience?")
							.setStyle("LONG")
							.setMinLength(15)
							.setMaxLength(200)
							.setPlaceholder("Answer in 15 - 200 chars.")
							.setRequired(true),
						new TextInputComponent()
							.setCustomId("contribute")
							.setLabel("What can you contribute to the staff team?")
							.setStyle("LONG")
							.setMinLength(15)
							.setMaxLength(200)
							.setPlaceholder("Answer in 15 - 200 chars.")
							.setRequired(true)
					);
		}

		showModal(modal, {
			client: client,
			interaction: interaction,
		});
	},
};
