// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/guildMemberAdd.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, GuildMember, MessageAttachment } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB"); //Make sure this path is correct
const { Welcomer } = require("canvacord");
const card = new Welcomer();

module.exports = {
	name: "guildMemberAdd",
	/**
	 * @param {GuildMember} member
	 */
	async execute(member) {
		const Data = await DB.findOne({
			GuildID: member.guild.id,
		});
		if (!Data) return;

		const logsChannel = member.guild.channels.cache.get(Data.WelcomeLogs);
		const logs = await member.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		if (log.action == "BOT_ADD") {
			// If the last entry fetched is of the type "BOT_ADD" it means a bot has joined
			const botJoinedEmbed = new MessageEmbed()
				.setTitle(
					"<:icons_unbanmember:866943415321100289> A Bot Joined The Server"
				)
				.setColor("GREEN")
				.setTimestamp()
				.setFooter({ text: member.guild.name })
				.setDescription(
					`> The bot ${member} has been added by \`${log.executor.tag}\` to this server`
				);

			logsChannel
				.send({ embeds: [botJoinedEmbed] })
				.catch((err) => console.log(err));
		} else {
			// Else it means a normal user joined
			card
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setMemberCount(member.guild.memberCount.toLocaleString())
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({ format: "png" }))
				.setColor("border", "#81a1c1")
				.setColor("username-box", "#81a1c1")
				.setColor("discriminator-box", "#81a1c1")
				.setColor("message-box", "#81a1c1")
				.setColor("title", "#81a1c1")
				.setColor("avatar", "#81a1c1")
				.setText("member-count", "{count} Members")
				.setText("title", "welcome")
				.setText("message", `welcome to ${member.guild.name}`)
				.build()
				.then((buffer) => {
					logsChannel.send({
						files: [
							{
								attachment: buffer,
								name: "welcome.png",
							},
						],
					});
				});
		}
	},
};
