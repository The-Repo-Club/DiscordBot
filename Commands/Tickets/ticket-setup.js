// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Tickets/ticket-setup.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const {
	CommandInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");

const DB = require("../../Structures/Schemas/ticketsSetupDB"); //Make sure this path is correct

module.exports = {
	name: "ticket-setup",
	path: "Tickets/ticket-setup.js",
	description: "Setup your ticketing system message.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "category",
			description: "Select the ticket's channel category.",
			required: true,
			type: "CHANNEL",
			channelType: ["GUILD_CATEGORY"],
		},
		{
			name: "channel",
			description: "Select the channel for creating tickets.",
			required: true,
			type: "CHANNEL",
			channelType: ["GUILD_TEXT"],
		},
		{
			name: "transcript",
			description: "Select the channel for creating transcripts.",
			required: true,
			type: "CHANNEL",
			channelType: ["GUILD_TEXT"],
		},
		{
			name: "handlers",
			description: "Select the ticket handler's role.",
			required: true,
			type: "ROLE",
		},
		{
			name: "description",
			description: "Provide a description message for the ticket creation.",
			required: true,
			type: "STRING",
		},
		{
			name: "button1",
			description:
				"Give your first button a name, (you can add an emoji by adding a comma followed by the emoji.)",
			required: true,
			type: "STRING",
		},
		{
			name: "button2",
			description:
				"Give your second button a name, (you can add an emoji by adding a comma followed by the emoji.)",
			required: true,
			type: "STRING",
		},
		{
			name: "button3",
			description:
				"Give your third button a name, (you can add an emoji by adding a comma followed by the emoji.)",
			required: true,
			type: "STRING",
		},
	],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, options } = interaction;

		try {
			const Category = options.getChannel("category");
			const Channel = options.getChannel("channel");
			const Transcript = options.getChannel("transcript");
			const Handlers = options.getRole("handlers");

			const Description = options.getString("description");

			const BUTTON1 = options.getString("button1").split(",");
			const BUTTON2 = options.getString("button2").split(",");
			const BUTTON3 = options.getString("button3").split(",");

			const Button1 = BUTTON1[0];
			const Button2 = BUTTON2[0];
			const Button3 = BUTTON3[0];

			const Emoji1 = BUTTON1[1];
			const Emoji2 = BUTTON2[1];
			const Emoji3 = BUTTON3[1];

			await DB.findOneAndUpdate(
				{ GuildID: guild.id },
				{
					Category: Category.id,
					Channel: Channel.id,
					Transcript: Transcript.id,
					Handlers: Handlers.id,
					Description: Description,
					Buttons: [Button1, Button2, Button3],
				},
				{
					new: true,
					upsert: true,
				}
			);
			const Buttons = new MessageActionRow();
			Buttons.addComponents(
				new MessageButton()
					.setCustomId(Button1)
					.setLabel(Button1)
					.setStyle("PRIMARY")
					.setEmoji(Emoji1),

				new MessageButton()
					.setCustomId(Button2)
					.setLabel(Button2)
					.setStyle("SECONDARY")
					.setEmoji(Emoji2),

				new MessageButton()
					.setCustomId(Button3)
					.setLabel(Button3)
					.setStyle("SUCCESS")
					.setEmoji(Emoji3)
			);
			const Embed = new MessageEmbed()
				.setAuthor({
					name: guild.name + " | Ticket System",
					iconURL: guild.iconURL({ dynamic: true }),
				})
				.setColor("BLURPLE")
				.setDescription(Description)
				.setFooter({ text: "Click a button to get started!" });

			await guild.channels.cache.get(Channel.id).send({
				embeds: [Embed],
				components: [Buttons],
			});

			interaction.reply({ content: "done", ephemeral: true });
		} catch (err) {
			console.log(err);
			const errEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription(
					`🟥 | An error occurred while setting up your ticket system.`
				)
				.addField(
					"What to make sure of?",
					`1. Make sure none of your button names are duplicated.
          2. Make sure you use this format for your buttons => Name,Emoji
          3. Make sure your button name does does not exceed 200 characters.
          4. Make sure your button emojis, are actually emojis, not IDs`
				);
			interaction.reply({ embeds: [errEmbed] });
		}
	},
};
