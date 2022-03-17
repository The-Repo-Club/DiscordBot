/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/channelinfo.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:16:38 PM [GMT]
 *
 *Description:
 *   Channel Info Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const { background } = require("../../Structures/colors.json");

module.exports = {
	name: "channelinfo",
	path: "Utilities/channelinfo.js",
	description: "See info about a channel.",
	options: [
		{
			name: "channel",
			description: "select a channel",
			type: "CHANNEL",
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { options, guild } = interaction;
		const channel = options.getChannel("channel");

		const embed = new MessageEmbed()
			.setAuthor({
				name: guild.name,
				iconURL: guild.iconURL({ dynamic: true }),
			})
			.setColor(background)
			.setDescription(`Info about ${channel} :`)
			.setFields(
				{
					name: "Name",
					value: `\`${channel.name}\``,
					inline: true,
				},
				{
					name: "Parent",
					value: `${channel.parentId ? `\`${channel.parent.name}\`` : "None"}`,
					inline: true,
				},
				{
					name: "Position",
					value: `\`${channel.position}\``,
					inline: true,
				},
				{
					name: "Nfsw",
					value: `\`${channel.nsfw}\``,
					inline: true,
				},
				{
					name: "Type",
					value: `\`${channel.type
						.slice(6)
						.toLowerCase()
						.replaceAll("_", " ")}\``,
					inline: true,
				},
				{
					name: "Created At",
					value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`,
					inline: true,
				}
			);

		return interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
