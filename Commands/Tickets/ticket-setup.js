// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Tickets/ticket-setup.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const {
	CommandInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");
const { ticketsCreateTicketID } = require("../../Structures/config.json");

const DB = require("../../Structures/Schemas/ticketsBD"); //Make sure this path is correct

module.exports = {
	name: "ticket-setup",
	description: "Setup your ticketing system message.",
	usage: "/ticket-setup",
	permission: "ADMINISTRATOR",
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild } = interaction;

		const Embed = new MessageEmbed()
			.setAuthor({
				name: guild.name + " | Ticket System",
				iconURL: guild.iconURL({ dynamic: true }),
			})
			.setColor("BLURPLE")
			.setDescription(
				"Need assistance? We offer free support for all of our users!"
			)
			.setFooter({ text: "Click a button to get started!" });

		const Buttons = new MessageActionRow();
		Buttons.addComponents(
			new MessageButton()
				.setCustomId("user_report")
				.setLabel("User Report")
				.setStyle("PRIMARY")
				.setEmoji("🧔"),

			new MessageButton()
				.setCustomId("bug_report")
				.setLabel("Bug Report")
				.setStyle("SECONDARY")
				.setEmoji("🐛"),

			new MessageButton()
				.setCustomId("other_report")
				.setLabel("Other Reports")
				.setStyle("SUCCESS")
				.setEmoji("🎟️")
		);

		await guild.channels.cache.get(ticketsCreateTicketID).send({
			embeds: [Embed],
			components: [Buttons],
		});

		interaction.reply({ content: "done", ephemeral: true });
	},
};
