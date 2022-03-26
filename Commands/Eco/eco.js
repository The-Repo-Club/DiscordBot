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
 *   Sat 26 March 2022, 10:20:21 PM [GMT]
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
			name: "daily",
			description: "Receive a daily bonus.",
			type: "SUB_COMMAND",
		},
		{
			name: "balance",
			description: "Check the balance of a user in the eco system",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "The user you would like to check the balance of.",
					type: "USER",
				},
			],
		},
		{
			name: "deposit",
			description: "Deposit currency into the eco bank.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "amount",
					description: "The amount of currency to deposit.",
					type: "NUMBER",
				},
			],
		},
		{
			name: "withdraw",
			description: "Withdraw currency into the eco bank.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "amount",
					description: "The amount of currency to withdraw.",
					type: "NUMBER",
				},
			],
		},
		{
			name: "pay",
			description: "Pay a selected use an amount.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "The user you would like to pay.",
					required: true,
					type: "USER",
				},
				{
					name: "amount",
					description: "The amount of currency you wish to pay.",
					required: true,
					type: "NUMBER",
				},
			],
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const currencyIcon = await ecoSys.icon();

		const options = interaction.options;
		const { member, guild } = interaction;

		const user = options.getUser("user") || interaction.user;
		const amount = options.getNumber("amount");

		switch (options.getSubcommand()) {
			case "balance":
				const balance = await ecoSys.getBalance(user.id, guild.id);

				if (balance.error) {
					return interaction.reply({ content: `${member.user} - ${balance.error.message}`, ephemeral: true });
				} else {
					const mem = guild.members.cache.get(balance.user);

					const announcement = new MessageEmbed()
						.setTitle(`${mem.user.tag}`)
						.setColor(green)
						.setFields(
							{
								name: `Wallet`,
								value: `${currencyIcon} \`${balance.currency.wallet}\``,
								inline: true,
							},
							{
								name: `Bank`,
								value: `${currencyIcon} \`${balance.currency.bank}\``,
								inline: true,
							}
						)
						.setTimestamp();
					return interaction.reply({ embeds: [announcement] });
				}
			case "deposit":
				const deposit = await ecoSys.deposit(user.id, guild.id, amount);
				if (deposit.error) {
					switch (deposit.error.message) {
						case "Not enough":
							return interaction.reply({ content: `${member.user} you do not have that much please only try to deposit what you have in your wallet.`, ephemeral: true });
						case "Invalid amount":
							return interaction.reply({ content: `${member.user} must pay a positive amount.`, ephemeral: true });
						default:
							return interaction.reply({ content: `${member.user} you do not have an account in the eco system.`, ephemeral: true });
					}
				} else {
					return interaction.reply({ content: ` ${member.user} has deposited ${amount} into there the eco bank.` });
				}
			case "withdraw":
				ecoSys.withdraw(user.id, guild.id, amount);

				const withdraw = await ecoSys.withdraw(user.id, guild.id, amount);
				if (withdraw.error) {
					switch (withdraw.error.message) {
						case "Not enough":
							return interaction.reply({ content: `${member.user} you do not have that much please only try to withdraw what you have in your bank.`, ephemeral: true });
						case "Invalid amount":
							return interaction.reply({ content: `${member.user} must pay a positive amount.`, ephemeral: true });
						default:
							return interaction.reply({ content: `${member.user} you do not have an account in the eco system.`, ephemeral: true });
					}
				} else {
					return interaction.reply({ content: ` ${member.user} has withdraw ${amount} from there the eco bank.` });
				}
			case "pay":
				const pay = ecoSys.pay(interaction.user.id, user.id, guild.id, amount);
				if (pay.error) {
					switch (pay.error.message) {
						case "Not enough":
							return interaction.reply({ content: `${member.user} you do not have that much please only try to deposit what you have in your wallet.`, ephemeral: true });
						case "Invalid amount":
							return interaction.reply({ content: `${member.user} must pay a positive amount.`, ephemeral: true });
						default:
							return interaction.reply({ content: `${member.user} you do not have an account in the eco system.`, ephemeral: true });
					}
				} else {
					return interaction.reply({ content: ` ${member.user} has paid ${user} in the amount of ${amount}.` });
				}
			case "join":
				const join = await ecoSys.joinEcoSystem(member.id, guild.id);

				if (join.error) {
					return interaction.reply({ content: `${member.user} - ${join.error.message}`, ephemeral: true });
				} else {
					return interaction.reply({ content: `<@${join.user}> has joined the eco system.` });
				}
		}
	},
};
