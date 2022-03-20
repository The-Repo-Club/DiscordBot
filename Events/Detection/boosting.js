/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Detection/boosting.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sun 20 March 2022, 09:40:48 AM [GMT]
 *Last edited:
 *   Sun 20 March 2022, 06:43:39 PM [GMT]
 *
 *Description:
 *   Boosting Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, canvas, colors.json
 **/

const { GuildMember, MessageEmbed, MessageAttachment } = require("discord.js");
const { background, selection, foreground, pink } = require("../../Structures/colors.json");
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
	name: "guildMemberUpdate",
	path: "Detection/boosting.js",
	/**
	 *
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 */
	async execute(oldMember, newMember) {
		const { guild } = oldMember;

		if (!guild.systemChannel) return;

		if (!guild.premiumSubscriptionCount.toLocaleString() > 0) return;

		const Thankyou = new MessageEmbed().setColor(pink).setAuthor({ name: "SERVER BOOSTED", iconURL: guild.iconURL({ dynamic: true }) });

		if (!oldMember.premiumSince && newMember.premiumSince) {
			const canvas = Canvas.createCanvas(1024, 450);
			const ctx = canvas.getContext("2d");
			const opacity = "0.6";

			const bg = await Canvas.loadImage("./Structures/Assets/Images/boost.png");
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
			ctx.fillRect(308, canvas.height - 110, 672, 65);

			// Draw username
			ctx.font = "38px Bold";
			ctx.fillStyle = pink;
			ctx.globalAlpha = 1;
			ctx.fillText(newMember.user.username, canvas.width - 690, canvas.height - 62);

			// Draw boostcounter
			const bc = guild.premiumSubscriptionCount.toLocaleString();
			ctx.fillStyle = foreground;
			ctx.font = "22px Bold";
			ctx.fillText(`[${bc}${nth(bc)} Boost]`, 40, canvas.height - 35);

			// Draw title
			ctx.font = "90px Bold";
			ctx.fillStyle = pink;
			ctx.fillText("BOOSTER", canvas.width - 620, canvas.height - 330);

			const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "png", dynamic: true }));

			// Draw avatar circle
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = pink;
			ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
			ctx.stroke();
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(avatar, 45, 90, 270, 270);

			const attach = new MessageAttachment(canvas.toBuffer(), "boost.png");

			Thankyou.setDescription("Thank you for boosting the server!").setImage("attachment://boost.png");

			guild.systemChannel.send({ embeds: [Thankyou], files: [attach] });
		}
	},
};
