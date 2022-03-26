/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Eco/balance.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Thu 24 March 2022, 08:20:06 PM [GMT]
 *Last edited:
 *   Sat 26 March 2022, 09:50:44 AM [GMT]
 *
 *Description:
 *   balance Eco System Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ecoSys
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const ecoSys = require("../../Systems/ecoSys");
const { green } = require("../../Structures/colors.json");

module.exports = {
	name: "eco-balance",
	path: "Eco/balance.js",
	description: "Eco",
	options: [
		{
			name: "user",
			description: "The user you wish check the balance of.",
			type: "USER",
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		let options = interaction.options;
		const { member, guild } = interaction;

		const user = options.getUser("user") || interaction.user;

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
	},
};
