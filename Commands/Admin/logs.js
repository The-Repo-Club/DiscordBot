// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/logs.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const DB = require("../../Structure/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "logs",
	description: "logs",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "channel",
			description: "The channel where logs will be sent.",
			type: "CHANNEL",
			channelTypes: ["GUILD_TEXT"],
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const channel = interaction.options.getChannel("channel");
		try {
			await channel
				.send({
					embeds: [
						new MessageEmbed()
							.setColor("AQUA")
							.setDescription(
								`✅ This channel has been set as a Logs channel.`
							),
					],
					ephemeral: true,
				})
				.then(async () => {
					await DB.findOneAndUpdate(
						{ GuildID: interaction.guild.id },
						{ Logs: channel.id },
						{ new: true, upsert: true }
					);
					interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor("DARK_RED")
								.setDescription(
									`✅ ${channel} has successfully been set as the Logs channel for ${interaction.guild.name}.`
								),
						],
						ephemeral: true,
					});
				});
		} catch (error) {
			if (error.message === "Missing Access") {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor("RED")
							.setDescription(
								`❌ The bot does not have access to this channel.`
							),
					],
				});
			} else {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setColor("RED")
							.setDescription(`❌ An error occurred. \n\n \`\`\`${error}\`\`\``)
							.setFooter({
								text: "This system was created by The-Repo-Club#3623",
							}),
					],
				});
			}
		}
	},
};
