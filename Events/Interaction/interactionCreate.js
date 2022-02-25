// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Interaction/interactionCreate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const cooldownsDB = require("../../Structures/Schemas/cooldownsDB");

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { guildId, guild, user } = interaction;
		if (client.maintenance && interaction.user.id != "861270236475817994") {
			const Response = new MessageEmbed()
				.setTitle("👷‍♂️ MAINTENANCE 👷‍♂️")
				.setDescription(
					"Sorry the bot will be back shortly when everything is working correctly."
				)
				.setColor("RED");

			return interaction.reply({ embeds: [Response] });
		}

		if (interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.commands.get(interaction.commandName);
			if (command) {
				const CommandName = command.name.replace(" ", "").toLowerCase();

				if (command.cooldown) {
					const cooldown =
						client.cooldowns.get(`${guildId}||${CommandName}||${user.id}`) -
						Date.now();
					const time = Math.floor(cooldown / 1000) + "";

					const Data = await cooldownsDB.findOne({
						Details: `${guildId}||${CommandName}||${user.id}`,
					});

					if (!Data) {
						await cooldownsDB.create({
							Details: `${guildId}||${CommandName}||${user.id}`,
							Time: Date.now() + command.cooldown,
						});
					}

					if (client.cooldowns.has(`${guildId}||${CommandName}||${user.id}`))
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setColor("#ff2600")
									.setDescription(
										`⛔ ${interaction.user} The __cooldown__ for **${
											command.name
										}** is still active.\nYou have to wait for another \` ${
											time.split(".")[0]
										} \` *second(s)*.`
									),
							],
							ephemeral: true,
						});

					// if (user.id != guild.ownerId) {
					client.cooldowns.set(
						`${guildId}||${CommandName}||${user.id}`,
						Date.now() + command.cooldown
					);
					// }

					setTimeout(async () => {
						client.cooldowns.delete(`${guildId}||${CommandName}||${user.id}`);
						await cooldownsDB.findOneAndDelete({
							Details: `${guildId}||${CommandName}||${user.id}`,
						});
					}, command.cooldown);
				}
			}

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
