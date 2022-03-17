// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Modals/Application/mod_application.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");
const { green } = require("../../../Structures/colors.json");

/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
module.exports = {
	name: "modalSubmit",
	path: "Modal/mod_application.js",
	async execute(interaction, client) {
		if (interaction.customId == "mod_application") {
			const age = interaction.getTextInputValue("age");
			const answer = interaction.getTextInputValue("answer");
			const hours = interaction.getTextInputValue("hours");
			const experience = interaction.getTextInputValue("experience");
			const contribute = interaction.getTextInputValue("contribute");

			const embed = new MessageEmbed()
				.setColor(green)
				.setTitle("Moderator Application Submission")
				.setDescription(`Sent by <@${interaction.member.id}>`)
				.addField("Age", `${age}`, false)
				.addField("Why do you want to be a Moderator?", `${answer}`, false)
				.addField("How many hours you can moderate?", `${hours}`, false)
				.addField("Do you have any past experience?", `${experience}`, false)
				.addField(
					"What can you contribute to the staff team?",
					`${contribute}`,
					false
				);

			const channel =
				interaction.guild.channels.cache.get("946483143915999323");

			channel.send({ embeds: [embed] });

			await interaction.deferReply({ ephemeral: true });
			interaction.followUp("Your application was successfully submitted.");
		}
	},
};
