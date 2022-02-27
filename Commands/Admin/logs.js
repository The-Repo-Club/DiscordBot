// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/logs.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { MessageEmbed, CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/logsDB"); //Make sure this path is correct
const ms = require("ms");

module.exports = {
	name: "logs",
	description: "Setup or reset the logs channel",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "setup",
			description: "Setup the server logs channel",
			type: "SUB_COMMAND",
			options: [
				{
					name: "channel",
					description: "Select the channel to send the server logs to",
					required: true,
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
				},
			],
		},
		{
			name: "reset",
			description: "Reset the logs channel",
			type: "SUB_COMMAND",
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		try {
			const options = interaction.options;
			const { guild } = interaction;

			switch (options.getSubcommand()) {
				case "setup":
					{
						const LogsChannel = options.getChannel("channel");

						await DB.findOneAndUpdate(
							{ GuildID: guild.id },
							{
								Logs: LogsChannel.id,
							},
							{
								new: true,
								upsert: true,
							}
						).catch((err) => console.log(err));

						const LogsSetup = new MessageEmbed()
							.setDescription("✅ | Successfully setup the server logs")
							.setColor("#43b581");

						await guild.channels.cache
							.get(LogsChannel.id)
							.send({ embeds: [LogsSetup] })
							.then((m) => {
								setTimeout(() => {
									m.delete().catch(() => {});
								}, ms("5s"));
							});

						await interaction.reply({
							content: "Done",
							ephemeral: true,
						});
					}
					break;
				case "reset":
					{
						const LogsReset = new MessageEmbed()
							.setDescription("✅ | Successfully reset the logging channel")
							.setColor("#43b581");
						DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
							if (err) throw err;
							if (!data)
								return interaction.reply({
									content: "There is no data to delete",
								});
							return interaction
								.reply({ embeds: [LogsReset], fetchReply: true })
								.then((msg) => {
									setTimeout(() => msg.delete(), ms("5s"));
								});
						});
					}
					return;
			}
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
							.setDescription(
								`❌ An error occurred. \n\n \`\`\`${error}\`\`\``
							),
					],
				});
			}
		}
	},
};
