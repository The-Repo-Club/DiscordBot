// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/guildMemberRemove.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, GuildMember, MessageAttachment } = require("discord.js");
const DB = require("../../Structures/Schemas/logsDB"); //Make sure this path is correct
const Canvas = require("../../Systems/Ranks/index");

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
		if (!Data || !Data.JoinLeaveLogs) return;

		const logsChannel = member.guild.channels.cache.get(Data.JoinLeaveLogs);

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
