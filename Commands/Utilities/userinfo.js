// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/userinfo.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "userinfo",
	type: "USER",
	context: true,
	permission: "ADMINISTRATOR",

	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 */
	async execute(interaction) {
		const Target = await interaction.guild.members.fetch(interaction.targetId);

		const Responce = new MessageEmbed()
			.setColor("ORANGE")
			.setAuthor({
				name: Target.user.tag,
				iconURL: Target.avatarURL({ dynamic: true, size: 512 }),
			})
			.setThumbnail(Target.user.avatarURL({ dynamic: true, size: 512 }))
			.addField("ID", `${Target.user.id}`, true)
			.addField(
				"Roles",
				`${
					Target.roles.cache
						.map((r) => r)
						.join(" ")
						.replace("@everyone", "") || "None"
				}`
			)
			.addField(
				"Member Since",
				`<t:${parseInt(Target.joinedTimestamp / 1000)}:R>`,
				true
			)
			.addField(
				"Discord Member Since",
				`<t:${parseInt(Target.user.createdTimestamp / 1000)}:R>`,
				true
			);

		interaction.reply({ embeds: [Responce], ephemeral: true });
	},
};
