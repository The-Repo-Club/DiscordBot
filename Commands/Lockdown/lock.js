// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Lockdown/lock.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/lockdownDB");
const ms = require("ms");

module.exports = {
	name: "lock",
	description: "Lockdown this channel",
	permission: "MANAGE_CHANNELS",
	options: [
		{
			name: "time",
			description: "Expire date for this lockdown.",
			type: "STRING",
		},
		{
			name: "reason",
			description: "Reason for this lockdown.",
			type: "STRING",
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, channel, options } = interaction;

		const Reason = options.getString("reason") || "no specified reason";

		const Embed = new MessageEmbed();

		if (!channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
			return interaction.reply({
				embeds: [
					Embed.setColor("RED").setDescription(
						"⛔ | This channel has already been locked!"
					),
				],
				ephemeral: true,
			});

		channel.permissionOverwrites.edit(guild.id, {
			SEND_MESSAGES: false,
		});

		interaction.reply({
			embeds: [
				Embed.setColor("ORANGE").setDescription(
					`🔒 | This channel is now on lockdown for: ${Reason}`
				),
			],
		});

		const Time = options.getString("time");
		if (Time) {
			const extDate = Date.now() + ms(Time);

			DB.create({ GuildID: guild.id, ChannelID: channel.id, Time: extDate });

			setTimeout(async () => {
				channel.permissionOverwrites.edit(guild.id, {
					SEND_MESSAGES: null,
				});
				interaction
					.editReply({
						embeds: [
							Embed.setColor("GREEN").setDescription(
								"🔓 | The lockdown has been lifted!"
							),
						],
					})
					.catch(() => {});
				await DB.deleteOne({ ChannelID: channel.id });
			}, ms(Time));
		}
	},
};
