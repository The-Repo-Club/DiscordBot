// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Maderation/clear.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "clear",
	description:
		"Deletes a specified number of messages from a channel or target.",
	permission: "MANAGE_MESSAGES",
	options: [
		{
			name: "amount",
			description:
				"Select the amount of messages to delete from a channel or target.",
			required: true,
			type: "NUMBER",
		},
		{
			name: "target",
			description: "Select a target to clear their messages.",
			required: false,
			type: "USER",
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { channel, options } = interaction;

		const Amount = options.getNumber("amount");
		const Target = options.getMember("target");

		const Messages = await channel.messages.fetch();

		const Responce = new MessageEmbed().setColor("RED");

		if (target) {
			let i = 0;
			const filetred = [];
			(await Messages).filter((m) => {
				if (m.author.id === target.id && Amount > i) {
					filetred.push(m);
					i++;
				}
			});

			await channel.bulkDelete(filetred, true).then((messages) => {
				Responce.setDescription(`🧹 Cleared ${messages.size} from ${Target}`);
				interaction.reply({
					embeds: [Responce],
				});
			});
		} else {
			await channel.bulkDelete(Amount, true).then((messages) => {
				Responce.setDescription(
					`🧹 Cleared ${messages.size} from this channel`
				);
				interaction.reply({
					embeds: [Responce],
				});
			});
		}
	},
};
