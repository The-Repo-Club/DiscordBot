/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/AFK/afk.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 06:57:59 PM [GMT]
 *
 *Description:
 *   AFK Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, afkDB
 **/

const {
	MessageEmbed,
	GuildMember,
	MessageAttachment,
	Message,
} = require("discord.js");
const Schema = require(`../../Structures/Schemas/afkDB`);

module.exports = {
	name: "messageCreate",
	path: "Member/afkEvent.js",
	/**
	 * @param {GuildMember} member
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot) return;

		const checkAFK = await Schema.findOne({
			Guild: message.guild.id,
			User: message.author.id,
		});

		if (checkAFK) {
			checkAFK.delete();

			const notAFK = new MessageEmbed()
				.setTitle(`Welcome Back ${message.author.username}!`)
				.setDescription(`You are no longer AFK!`)
				.setColor("BLUE");

			message.channel.send({ embeds: [notAFK] });
		}

		const mentionedUser = message.mentions.users.first();
		if (mentionedUser) {
			const data = await Schema.findOne({
				Guild: message.guild.id,
				User: mentionedUser.id,
			});

			if (data) {
				const embed = new MessageEmbed()
					.setTitle(`🟡 ${mentionedUser.username} is currently AFK!`)
					.setColor("YELLOW")
					.setDescription(
						`Reason: \`${data.Reason}\`\n AFK Since: <t:${Math.round(
							data.Date / 1000
						)}:R>`
					);

				message.channel.send({ embeds: [embed] });
			}
		}
	},
};
