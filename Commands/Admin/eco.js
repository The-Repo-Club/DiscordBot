/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/eco.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Thu 24 March 2022, 08:20:06 PM [GMT]
 *Last edited:
 *   Sat 26 March 2022, 10:09:11 PM [GMT]
 *
 *Description:
 *   eco Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ecoSys
 **/

const { CommandInteraction } = require("discord.js");
const ecoSys = require("../../Systems/ecoSys");

module.exports = {
	name: "eco-admin",
	path: "Admin/eco.js",
	description: "Eco",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "wallet",
			description: "Wallet sub commands",
			type: "SUB_COMMAND_GROUP",
			options: [
				{
					name: "add",
					description: "The amount of currency you wish add.",
					type: "SUB_COMMAND",
					options: [
						{
							name: "amount",
							description: "The amount of currency you wish add.",
							required: true,
							type: "NUMBER",
						},
						{
							name: "user",
							description: "The user you wish to add currency to.",
							type: "USER",
						},
					],
				},
				{
					name: "remove",
					description: "The amount of currency you wish remove.",
					type: "SUB_COMMAND",
					options: [
						{
							name: "amount",
							description: "The amount of currency you wish add.",
							required: true,
							type: "NUMBER",
						},
						{
							name: "user",
							description: "The user you wish to remove currency from.",
							type: "USER",
						},
					],
				},
			],
		},
		{
			name: "bank",
			description: "Bank sub commands",
			type: "SUB_COMMAND_GROUP",
			options: [
				{
					name: "add",
					description: "Add currency to a selected user.",
					type: "SUB_COMMAND",
					options: [
						{
							name: "amount",
							description: "The amount of currency you would like to add.",
							required: true,
							type: "NUMBER",
						},
						{
							name: "user",
							description: "The user you would like to add currency to.",
							type: "USER",
						},
					],
				},
				{
					name: "remove",
					description: "Remove currency from a selected user.",
					type: "SUB_COMMAND",
					options: [
						{
							name: "amount",
							description: "The amount of currency you would like to remove.",
							required: true,
							type: "NUMBER",
						},
						{
							name: "user",
							description: "The user you would like to remove currency from.",
							type: "USER",
						},
					],
				},
			],
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
		const amount = options.getNumber("amount");

		switch (options.getSubcommand()) {
			case "add":
				switch (options.getSubcommandGroup()) {
					case "wallet":
						const wallet = await ecoSys.addWallet(user.id, guild.id, amount);
						if (wallet.error) {
							switch (wallet.error.message) {
								case "Invalid amount":
									return interaction.reply({ content: `${member.user} sorry that is not a valid amount.`, ephemeral: true });
								case "Invalid userID":
									return interaction.reply({ content: `${member.user} sorry that is not a valid user.`, ephemeral: true });
								default:
									return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							}
						} else {
							return interaction.reply({ content: `${member.user} added ${amount} to <@${wallet.user}>'s wallet` });
						}
					case "bank":
						const bank = await ecoSys.addBank(user.id, guild.id, amount);
						if (bank.error) {
							switch (bank.error.message) {
								case "Invalid amount":
									return interaction.reply({ content: `${member.user} sorry that is not a valid amount.`, ephemeral: true });
								case "Invalid userID":
									return interaction.reply({ content: `${member.user} sorry that is not a valid user.`, ephemeral: true });
								default:
									return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							}
						} else {
							return interaction.reply({ content: `${member.user} added ${amount} to <@${bank.user}>'s bank` });
						}
				}
				break;
			case "remove":
				switch (options.getSubcommandGroup()) {
					case "wallet":
						const wallet = await ecoSys.removeWallet(user.id, guild.id, amount);
						if (wallet.error) {
							switch (wallet.error.message) {
								case "Invalid amount":
									return interaction.reply({ content: `${member.user} sorry that is not a valid amount.`, ephemeral: true });
								case "Invalid userID":
									return interaction.reply({ content: `${member.user} sorry that is not a valid user.`, ephemeral: true });
								default:
									return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							}
						} else {
							return interaction.reply({ content: `${member.user} removed ${amount} from <@${wallet.user}>'s wallet` });
						}
					case "bank":
						const bank = await ecoSys.removeBank(user.id, guild.id, amount);
						if (bank.error) {
							switch (bank.error.message) {
								case "Invalid amount":
									return interaction.reply({ content: `${member.user} sorry that is not a valid amount.`, ephemeral: true });
								case "Invalid userID":
									return interaction.reply({ content: `${member.user} sorry that is not a valid user.`, ephemeral: true });
								default:
									return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							}
						} else {
							return interaction.reply({ content: `${member.user} removed ${amount} from <@${bank.user}>'s bank` });
						}
				}
				break;
		}
	},
};
