// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Modals/Application/application.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");

/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
module.exports = {
	name: "modalSubmit",
	path: "Modal/application.js",
	async execute(interaction, client) {
		if (interaction.customId == "application") {
			const gender = interaction.getTextInputValue("gender");
			const age = interaction.getTextInputValue("age");
			const answer = interaction.getTextInputValue("answer");
			const type = client.position;

			const embed = new MessageEmbed()
				.setColor("GREEN")
				.setTitle(`${type} Application Submission`)
				.setDescription(`Sent by <@${interaction.member.id}>`)
				.addField("Gender", `${gender}`, true)
				.addField("Age", `${age}`, true)
				.addField("Why do you want to be a mod?", `${answer}`, false);

			const channel =
				interaction.guild.channels.cache.get("946483143915999323");

			channel.send({ embeds: [embed] });

			await interaction.deferReply({ ephemeral: true });
			interaction.followUp("Your application was successfully submitted.");
		}
	},
};
