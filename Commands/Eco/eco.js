/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   eco.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Thu 24 March 2022, 08:20:06 PM [GMT]
 *Last edited:
 *   Sat 26 March 2022, 09:59:55 AM [GMT]
 *
 *Description:
 *   eco Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ecoSys
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const ecoSys = require("../../Systems/ecoSys");
const { green } = require("../../Structures/colors.json");

module.exports = {
	name: "eco",
	path: "Eco/eco.js",
	description: "Eco",
	options: [
		{
			name: "join",
			description: "Join the eco system",
			type: "SUB_COMMAND",
		},
		{
			name: "balance",
			description: "Check the balance of a user in the eco system",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "The user you wish check the balance of.",
					type: "USER",
				},
			],
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const options = interaction.options;
		const { member, guild } = interaction;

		const user = options.getUser("user") || interaction.user;

		switch (options.getSubcommand()) {
			case "balance":
				ecoSys
					.getBalance(user.id, guild.id)
					.then((data) => {
						const { userID, currency } = data;

						const mem = guild.members.cache.get(userID);

						const announcement = new MessageEmbed()
							.setTitle(`${mem.user.tag}`)
							.setColor(green)
							.setFields(
								{
									name: "Bank",
									value: `\`${currency.bank}\``,
									inline: true,
								},
								{
									name: "Wallet",
									value: `\`${currency.wallet}\``,
									inline: true,
								}
							)
							.setTimestamp();
						return interaction.reply({ embeds: [announcement] });
					})
					.catch((err) => {
						if (interaction.user.id === user.id) {
							return interaction.reply({ content: `${member.user} sorry you must first join the eco system with /eco join before you can run any of the other eco system commands.`, ephemeral: true });
						} else {
							return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system.`, ephemeral: true });
						}
					});
				break;
			case "join":
				ecoSys
					.joinEcoSystem(member.id, guild.id)
					.then((msg) => {
						return interaction.reply({ content: ` ${member.user} has joined the eco system.` });
					})
					.catch((err) => {
						return interaction.reply({ content: `${member.user} you have already joined the eco system.`, ephemeral: true });
					});
				break;
		}
	},
};
