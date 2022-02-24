const {
	CommandInteraction,
	Client,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");
const Staff = ["Founder", "The-Repo-Bot"];

module.exports = {
	name: "invite",
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
