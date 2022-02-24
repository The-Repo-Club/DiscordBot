// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Suggestions/suggest.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "suggest",
	description: "Suggest a new feature!",
	options: [
		{
			name: "type",
			description: "Select the type of suggestion!",
			required: true,
			type: "STRING",
			choses: [
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
			name: "name",
			description: "Provide a name for the suggestion!",
			required: true,
			type: "STRING",
		},
		{
			name: "functionality",
			description: "Provide the functionality for the suggestion!",
			required: true,
			type: "STRING",
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { options } = interaction;

		const Type = options.getString("type");
		const Name = options.getString("name");
		const Func = options.getString("functionality");

		const Responce = new MessageEmbed()
			.setColor("PURPLE")
			.setDescription(`${interaction.member} has suggested a ${Type}.`)
			.addField("Name", `${Name}`, true)
			.addField("Functionality", `${Func}`, true);

		const message = await interaction.reply({
			embeds: [Responce],
			fetchReply: true,
		});
		message.react("🟩");
		message.react("🟥");
	},
};
