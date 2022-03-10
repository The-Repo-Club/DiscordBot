// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Moderation/clear.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
	name: "clear",
	path: "Moderation/clear.js",
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

		const Response = new MessageEmbed().setColor("RED");

		if (Amount > 100 || Amount <= 0) {
			Response.setDescription(`Amount cannot exceed 100.`);
			return interaction.reply({ embeds: [Response] });
		}

		if (Target) {
			let i = 0;
			const filetred = [];
			(await Messages).filter((m) => {
				if (m.author.id === target.id && Amount > i) {
					filetred.push(m);
					i++;
				}
			});

			await channel.bulkDelete(filetred, true).then((messages) => {
				Response.setDescription(`🧹 Cleared ${messages.size} from ${Target}`);
				interaction
					.reply({
						embeds: [Response],
						fetchReply: true,
					})
					.then((msg) => {
						setTimeout(() => msg.delete(), ms("5s"));
					});
			});
		} else {
			await channel.bulkDelete(Amount, true).then((messages) => {
				Response.setDescription(
					`🧹 Cleared ${messages.size} from this channel`
				);
				interaction
					.reply({
						embeds: [Response],
						fetchReply: true,
					})
					.then((msg) => {
						setTimeout(() => msg.delete(), ms("5s"));
					});
			});
		}
	},
};
