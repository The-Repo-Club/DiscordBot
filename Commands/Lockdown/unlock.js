/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Lockdown/unlock.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:05:09 PM [GMT]
 *
 *Description:
 *   Unlock Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, lockdownDB
 **/

// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Lockdown/unlock.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");
const { red, green } = require("../../Structures/colors.json");
const DB = require("../../Structures/Schemas/lockdownDB");
const ms = require("ms");

module.exports = {
	name: "unlock",
	path: "Lockdown/unlock.js",
	description: "Remove lockdown from this channel",
	permission: "MANAGE_CHANNELS",
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, channel } = interaction;

		const Embed = new MessageEmbed();

		if (channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
			return interaction.reply({
				embeds: [
					Embed.setColor(red).setDescription(
						"🟥 | This channel has already been unlocked!"
					),
				],
				ephemeral: true,
			});

		channel.permissionOverwrites.edit(guild.id, {
			SEND_MESSAGES: null,
		});

		await DB.deleteOne({ ChannelID: channel.id });

		interaction.reply({
			embeds: [
				Embed.setColor(green).setDescription(
					"🔓 | The lockdown has been lifted!"
				),
			],
		});
	},
};
