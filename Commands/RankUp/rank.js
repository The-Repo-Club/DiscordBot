/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/RankUp/rank.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Mon 21 March 2022, 03:00:05 PM [GMT]
 *
 *Description:
 *   Rank Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, canvas, discord.js, levelsSys
 **/

const { CommandInteraction, Client, MessageAttachment, MessageEmbed } = require("discord.js");
const Levels = require("../../Systems/levelsSys");
const { badgesNames, badgesColors } = require("../../Structures/ranks.json");
const Canvas = require("canvas");
const { background, selection, foreground, orange, green, red } = require("../../Structures/colors.json");

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
	name: "rank",
	path: "RankUp/rank.js",
	description: "Get the rank of a user.",
	options: [
		{
			name: "target",
			description: "Mention a user to see their rank.",
			type: "USER",
			required: false,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const Target = interaction.options.getMember("target") || interaction.member;
		const users = await Levels.fetch(Target.id, interaction.guildId, true);

		if (!users) return interaction.reply({ content: "The mentioned user has no XP." });

		const Rank = new MessageEmbed().setColor(green).setAuthor({ name: "RANKUP SYSTEM", iconURL: interaction.guild.iconURL({ dynamic: true }) });

		const neededXp = Levels.xpFor(parseInt(users.level) + 1);

		const canvas = Canvas.createCanvas(1080, 400);
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

		// Draw overlay
		ctx.fillStyle = selection;
		ctx.globalAlpha = opacity;
		ctx.fillRect(50, 0, 240, canvas.height);
		ctx.globalAlpha = 1;

		// Avatar
		const avatar = await Canvas.loadImage(Target.displayAvatarURL({ format: "png", dynamic: true }));
		ctx.drawImage(avatar, 50 + 30, 30, 180, 180);

		// Level

		ctx.fillStyle = orange;
		ctx.globalAlpha = opacity;
		ctx.fillRect(50 + 30, 30 + 180 + 30, 180, 50);
		ctx.globalAlpha = 1;
		ctx.fillStyle = foreground;
		ctx.font = "32px Bold";
		ctx.textAlign = "center";
		if (!users.level > 0) {
			ctx.fillText(`Level 0`, 50 + 30 + 180 / 2, 30 + 180 + 30 + 38);
		} else {
			ctx.fillText(`Level ${users.level}`, 50 + 30 + 180 / 2, 30 + 180 + 30 + 38);
		}

		// Rep
		ctx.fillStyle = orange;
		ctx.globalAlpha = opacity;
		ctx.fillRect(50 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
		ctx.globalAlpha = 1;
		ctx.fillStyle = foreground;
		ctx.font = "32px Bold";
		ctx.textAlign = "center";
		if (!users.rep > 0) {
			ctx.fillText(`Rep 0`, 50 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
		} else {
			ctx.fillText(`Rep ${users.rep}`, 50 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
		}

		// Username
		ctx.textAlign = "left";
		ctx.fillStyle = foreground;
		ctx.font = "45px Bold";
		ctx.fillText(Target.user.username, 50 + 240 + 45 + 5, 80);

		// Rank
		if (users.position > 0) {
			ctx.textAlign = "right";
			ctx.fillStyle = foreground;
			ctx.font = "45px Bold";
			ctx.fillText(`#${users.position}`, canvas.width - 50 - 5, 80);
		}

		// Badges
		if (badgesNames && badgesColors) {
			ctx.fillStyle = selection;
			ctx.globalAlpha = opacity;
			ctx.fillRect(240 + 50 + 50, 295, 700, 70);
			ctx.fillStyle = foreground;
			const badgeNames = badgesNames;
			for (let index = 0; index < badgeNames.length; index++) {
				const badge = `${users.badges[badgeNames[index]]}`;
				if (badge === "null") {
					ctx.globalAlpha = opacity;
					ctx.textAlign = "center";
					ctx.font = "200px Bold";
					ctx.fillText(".", 75 * index + 390, 340);
				} else {
					ctx.globalAlpha = 1;
					const badgeImg = await Canvas.loadImage(badgesColors.includes(badge.toLowerCase()) ? `${__dirname}/../../Structures/Assets/Badges/${badgeNames[index]}_${badge.toLowerCase()}.png` : badge);
					ctx.drawImage(badgeImg, 75 * index + 365, 305, 50, 50);
				}
			}
		}

		// Role Name
		ctx.textAlign = "left";
		ctx.fillStyle = interaction.member.displayHexColor;
		ctx.font = "35px Bold";
		ctx.fillText(Target.roles.highest.name, 50 + 240 + 45 + 5, 80 + 45 + 15);

		// XP Bar
		ctx.globalAlpha = 1;
		const textXPEdited = `${users.xp}/${neededXp} for next rank`;
		ctx.textAlign = "center";
		ctx.fillStyle = foreground;
		ctx.font = "25px Bold";
		ctx.fillText(textXPEdited, 50 + 240 + 45 + 5 + 690 / 2, 80 + 45 + 15 + 30 + 90);
		ctx.beginPath();
		ctx.moveTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40);
		ctx.lineTo(240 + 50 + 50 + 700 - 25, 80 + 45 + 10 + 40);
		ctx.lineTo(240 + 50 + 50 + 700, 80 + 45 + 10 + 40, 240 + 50 + 50 + 700, 80 + 45 + 10 + 40 + 25);
		ctx.lineTo(240 + 50 + 50 + 700, 80 + 45 + 10 + 40 + 50 - 25);
		ctx.lineTo(240 + 50 + 50 + 700, 80 + 45 + 10 + 40 + 50, 240 + 50 + 50 + 700 - 25, 80 + 45 + 10 + 40 + 50);
		ctx.lineTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40 + 50);
		ctx.lineTo(240 + 50 + 50, 80 + 45 + 10 + 40 + 50, 240 + 50 + 50, 80 + 45 + 10 + 40 + 50 - 25);
		ctx.lineTo(240 + 50 + 50, 80 + 45 + 10 + 40 + 25);
		ctx.lineTo(240 + 50 + 50, 80 + 45 + 10 + 40, 240 + 50 + 50 + 25, 80 + 45 + 10 + 40);
		ctx.closePath();
		ctx.clip();
		ctx.fillStyle = selection;
		ctx.globalAlpha = 1;
		ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, 700, 50);
		ctx.fillStyle = red;
		ctx.globalAlpha = opacity;
		const percent = (100 * users.xp) / neededXp;
		const progress = (percent * 700) / 100;
		ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, progress, 50);
		ctx.restore();

		const attach = new MessageAttachment(canvas.toBuffer(), "rank.png");

		Rank.setImage("attachment://rank.png");

		interaction.reply({ embeds: [Rank], files: [attach] });
	},
};
