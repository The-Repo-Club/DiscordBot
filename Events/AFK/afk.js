// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/afkEvent.js
// Git           - https://github.com/1dxy/DiscordBot
// Author        - 1dxy [1dxyofficial@gmail.com]
// Start On      - Monday 14 February 2022, 5:16 pm (EST)
// Finished On   - Monday 14 February 2022, 5:36 pm (EST)
// -------------------------------------------------------------------------

const { MessageEmbed, GuildMember, MessageAttachment, Message } = require("discord.js");
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

        const checkAFK = await Schema.findOne({Guild: message.guild.id, User: message.author.id})

        if (checkAFK) {
            checkAFK.delete()

            const notAFK = new MessageEmbed()
              .setTitle(`Welcome Back ${message.author.username}!`)
              .setDescription(`You are no longer AFK!`)
              .setColor("BLUE")

            message.channel.send({ embeds: [notAFK]})
        }

     const mentionedUser = message.mentions.users.first();
     if (mentionedUser) {

        const data = await Schema.findOne({Guild: message.guild.id, User: mentionedUser.id})

        if (data) {
            const embed = new MessageEmbed()
              .setTitle(`🟡 ${mentionedUser.username} is currently AFK!`)
              .setColor("YELLOW")
              .setDescription(`Reason: \`${data.Reason}\`\n AFK Since: <t:${Math.round(data.Date / 1000)}:R>`)

            message.channel.send({ embeds: [embed]})
        }
     }
	}
};
