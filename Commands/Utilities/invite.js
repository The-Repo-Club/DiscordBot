/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/invite.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 09:22:59 PM [GMT]
 *
 *Description:
 *   Invite Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

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
		const inviteID = await require("../../Systems/inviteSys")(client);
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
					`https://discord.com/api/oauth2/authorize?client_id=${client?.user?.id}&permissions=8&scope=bot%20applications.commands`
				)
				.setLabel("Invite Me")
				.setStyle("LINK"),

			new MessageButton()
				.setURL(`https://discord.gg//invite/${inviteID}`)
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
