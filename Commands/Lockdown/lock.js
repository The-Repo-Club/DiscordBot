/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Lockdown/lock.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 05:44:27 PM [GMT]
 *
 *Description:
 *   Lock Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, lockdownDB
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/lockdownDB");
const ms = require("ms");

module.exports = {
	name: "lock",
	path: "Lockdown/lock.js",
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
						"🟥 | This channel has already been locked!"
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
