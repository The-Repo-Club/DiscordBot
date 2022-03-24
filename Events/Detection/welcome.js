/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Detection/welcome.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 11:35:22 PM [GMT]
 *
 *Description:
 *   Welcome Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, canvas, colors.json, channelsDB
 **/

const { MessageEmbed, GuildMember, MessageAttachment } = require("discord.js");
const { green, selection, background, foreground } = require("../../Structures/colors.json");
const DB = require("../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const Canvas = require("canvas");

const nth = function (d) {
	const dString = String(d);
	const last = +dString.slice(-2);
	if (last > 3 && last < 21) return "th";
	switch (last % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};

module.exports = {
	name: "guildMemberAdd",
	path: "Detection/welcome.js",
	/**
	 * @param {GuildMember} member
	 */
	async execute(member) {
		const Data = await DB.findOne({
			GuildID: member.guild.id,
		});

		const logs = await member.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		if (log.action == "BOT_ADD") {
			// If the last entry fetched is of the type "BOT_ADD" it means a bot has joined
			const botJoinedEmbed = new MessageEmbed().setTitle("<:icons_unbanmember:949376464388784138> A Bot Joined The Server").setColor(green).setTimestamp().setFooter({ text: member.guild.name }).setDescription(`> The bot ${member} has been added by \`${log.executor.tag}\` to this server`);

			if (!Data || !Data.logs.joinLeaveLogs) return;

			const logsChannel = member.guild.channels.cache.get(Data.logs.joinLeaveLogs);

			if (!member.guild.systemChannel) return logsChannel.send({ embeds: [botJoinedEmbed] }).catch((err) => console.log(err));

			return member.guild.systemChannel.send({ embeds: [botJoinedEmbed] }).catch((err) => console.log(err));
		} else {
			const Welcome = new MessageEmbed().setColor(green).setAuthor({ name: "NEW USER JOINED", iconURL: member.guild.iconURL({ dynamic: true }) });

			const canvas = Canvas.createCanvas(1024, 450);
			const ctx = canvas.getContext("2d");
			const opacity = "0.6";

			const bg = await Canvas.loadImage("./Structures/Assets/Images/system.png");

			// Draw background
			ctx.fillStyle = background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

			// Draw layer
			ctx.fillStyle = selection;
			ctx.globalAlpha = opacity;
			ctx.fillRect(0, 0, 25, canvas.height);
			ctx.fillRect(canvas.width - 25, 0, 25, canvas.height);
			ctx.fillRect(25, 0, canvas.width - 50, 25);
			ctx.fillRect(25, canvas.height - 25, canvas.width - 50, 25);
			ctx.fillStyle = selection;
			ctx.globalAlpha = opacity;
			ctx.fillRect(344, canvas.height - 296, 625, 65);
			ctx.fillStyle = selection;
			ctx.globalAlpha = opacity;
			ctx.fillRect(389, canvas.height - 225, 138, 65);
			ctx.fillStyle = selection;
			ctx.globalAlpha = opacity;
			ctx.fillRect(308, canvas.height - 110, 672, 65);

			// Draw username
			ctx.font = "48px Bold";
			ctx.fillStyle = foreground;
			ctx.globalAlpha = 1;
			ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);

			// Draw guild name
			ctx.font = "33px Bold";
			ctx.fillStyle = foreground;
			ctx.fillText(member.guild.name, canvas.width - 690, canvas.height - 62);

			// Draw # for discriminator
			ctx.font = "75px SketchMatch";
			ctx.fillStyle = foreground;
			ctx.fillText("#", canvas.width - 690, canvas.height - 165);

			// Draw discriminator
			ctx.font = "40px Bold";
			ctx.fillStyle = foreground;
			ctx.fillText(member.user.discriminator, canvas.width - 623, canvas.height - 178);

			// Draw membercount
			const mc = member.guild.memberCount;
			ctx.fillStyle = foreground;
			ctx.font = "22px Bold";
			ctx.fillText(`[${mc}${nth(mc)} Member]`, 40, canvas.height - 35);

			// Draw title
			ctx.font = "90px Bold";
			ctx.fillStyle = green;
			ctx.fillText("WELCOME", canvas.width - 620, canvas.height - 330);

			const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png", dynamic: true }));

			// Draw avatar circle
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = green;
			ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
			ctx.stroke();
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(avatar, 45, 90, 270, 270);

			const attach = new MessageAttachment(canvas.toBuffer(), "welcome.png");

			Welcome.setDescription("Thank you for joining the server!").setImage("attachment://welcome.png");

			if (!Data) {
				if (member.guild.systemChannel) return member.guild.systemChannel.send({ embeds: [Welcome], files: [attach] }).catch((err) => console.log(err));
			} else {
				if (Data.logs.joinLeaveLogs) {
					const logsChannel = member.guild.channels.cache.get(Data.logs.joinLeaveLogs);

					return logsChannel.send({ embeds: [Welcome], files: [attach] }).catch((err) => console.log(err));
				} else {
					if (member.guild.systemChannel) return member.guild.systemChannel.send({ embeds: [Welcome], files: [attach] }).catch((err) => console.log(err));
				}
			}
		}
	},
};
