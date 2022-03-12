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
const Canvas = require("../../Systems/Canvas/index");

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
		const Target =
			interaction.options.getMember("target") || interaction.member;
		const users = await Levels.fetch(Target.id, interaction.guildId, true);

		if (!users)
			return interaction.reply({ content: "The mentioned user has no XP." });

		const neededXp = Levels.xpFor(parseInt(users.level) + 1);

		const image = await new Canvas.RankCard()
			.setUsername(Target.user.username)
			.setAvatar(Target.displayAvatarURL({ format: "png", size: 512 }))
			.setLevel(users.level)
			.setAddon("RankName", true)
			.setAddon("Reputation", false)
			.setAddon("Rank", true)
			.setReputation(users.xp)
			.setRankName(Target.roles.highest.name)
			.setRank(users.position)
			.setXP("Current", users.xp)
			.setXP("Needed", neededXp)
			.setColor("Background", "#283036")
			.toAttachment();
		const attachment = new MessageAttachment(image.toBuffer(), "RankCard.png");
		interaction.reply({ files: [attachment] });
	},
};
