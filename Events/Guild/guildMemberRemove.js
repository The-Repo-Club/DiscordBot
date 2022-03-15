/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/Guild/guildMemberRemove.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 10:06:27 PM [GMT]
 *
 *Description:
 *   guildMemberRemove Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, canvas, channelsDB
 **/

const { MessageEmbed, GuildMember, MessageAttachment } = require("discord.js");
const DB = require("../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const Canvas = require("../../Systems/Canvas/index");

module.exports = {
	name: "guildMemberRemove",
	path: "Member/guildMemberRemove.js",
	/**
	 * @param {GuildMember} member
	 */
	async execute(member) {
		const Data = await DB.findOne({
			GuildID: member.guild.id,
		});
		if (!Data || !Data.logs.joinLeaveLogs) return;

		const logsChannel = member.guild.channels.cache.get(
			Data.logs.joinLeaveLogs
		);

		// Else it means a normal user joined
		const image = await new Canvas.Goodbye()
			.setUsername(member.user.username)
			.setDiscriminator(member.user.discriminator)
			.setAvatar(member.displayAvatarURL({ format: "png", size: 512 }))
			.setMemberCount(member.guild.memberCount)
			.setGuildName(member.guild.name)
			.setColor("Background", "#283036")
			.toAttachment();
		const attachment = new MessageAttachment(
			image.toBuffer(),
			"MemberWelcomeCard.png"
		);
		logsChannel.send({ files: [attachment] }).catch((err) => console.log(err));
	},
};
