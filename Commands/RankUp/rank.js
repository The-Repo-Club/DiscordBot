// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/RankUp/rank.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, Client, MessageAttachment } = require("discord.js");
const Levels = require("../../Systems/levelsSys");
const canvacord = require("canvacord");

const Canvas = require("../../Utils/ranks");

module.exports = {
	name: "rank",
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
		const Target =
			interaction.options.getMember("target") || interaction.member;
		const users = await Levels.fetch(Target.id, interaction.guildId);

		if (!users)
			return interaction.reply({ content: "The mentioned user has no XP." });

		const neededXp = Levels.xpFor(parseInt(users.level) + 1);

		const rank = new canvacord.Rank()
			.setBackground("COLOR", "#283036")
			.setAvatar(Target.displayAvatarURL({ format: "png", size: 512 }))
			.setStatus(Target.presence.status)
			.setCurrentXP(users.xp, "#a6ffa6")
			.setRequiredXP(neededXp, "#ffc9a6")
			.setLevelColor("#ffa6a6", "#ffa6a6")
			.setLevel(users.level)
			.setRankColor("#ffa6fc", "#ffa6fc")
			.setProgressBar("#a6fffc", "COLOR")
			.setUsername(Target.user.username, "#ffffa6")
			.setDiscriminator(Target.user.discriminator, "rgba(255,255,166,0.6)");

		rank.build().then((data) => {
			const attachment = new MessageAttachment(data, "RankCard.png");
			interaction.reply({ files: [attachment] });
		});

		// const image = await new Canvas.RankCard()
		// 	.setUsername(Target.user.username)
		// 	.setAvatar(Target.displayAvatarURL({ format: "png", size: 512 }))
		// 	.setLevel(users.level)
		// 	.setAddon("RankName", false)
		// 	.setAddon("Reputation", false)
		// 	// .setAddon("Rank", false)
		// 	.setReputation(users.xp)
		// 	.setRankName("professional")
		// 	.setRank(users.rank)
		// 	.setXP("current", neededXp)
		// 	.setXP("needed", 1000)
		// 	.setColor("Background", "#283036")
		// 	.toAttachment();
		// const attachment = new MessageAttachment(image.toBuffer(), "RankCard.png");
		// interaction.reply({ files: [attachment] });
	},
};
