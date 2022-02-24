// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Interaction/interactionCreate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.commands.get(interaction.commandName);
			if (!command)
				return (
					interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor("RED")
								.setDescription(
									"⛔ An error occured while running this command."
								)
								.setTimestamp(),
						],
					}) && client.commands.delete(interaction.commandName)
				);
			command.execute(interaction, client);
		}
	},
};
