// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/invite.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const {
	CommandInteraction,
	Client,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");

module.exports = {
	name: "invite",
	path: "Utilities/invite.js",
	description: "Invite me to your server!",

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const Invite = new MessageEmbed()
			.setTitle("Invite Me!")
			.setDescription(
				"I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe 👋"
			)
			.setColor("RED")
			.setThumbnail(client.user.displayAvatarURL());

		let row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL(
					"https://discord.com/api/oauth2/authorize?client_id=937294229263224862&permissions=8&scope=bot%20applications.commands"
				)
				.setLabel("Invite Me")
				.setStyle("LINK"),

			new MessageButton()
				.setURL("https://discord.gg/knight")
				.setLabel("Support Server")
				.setStyle("LINK")
		);

		return interaction.reply({
			embeds: [Invite],
			components: [row],
			ephemeral: true,
		});
	},
};
