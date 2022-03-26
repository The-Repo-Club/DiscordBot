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
 *   Sat 26 March 2022, 09:46:00 AM [GMT]
 *
 *Description:
 *   eco Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ecoSys
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const ecoSys = require("../../Systems/ecoSys");

module.exports = {
	name: "eco",
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
						ecoSys
							.addWallet(user.id, guild.id, amount)
							.then((msg) => {
								return interaction.reply({ content: `${member.user} Added ${amount} to ${user.username}'s wallet` });
							})
							.catch((err) => {
								return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							});
						break;
					case "bank":
						ecoSys
							.addBank(user.id, guild.id, amount)
							.then((msg) => {
								return interaction.reply({ content: `${member.user} Added ${amount} to ${user.username}'s bank` });
							})
							.catch((err) => {
								return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							});
						break;
				}
				break;
			case "remove":
				switch (options.getSubcommandGroup()) {
					case "wallet":
						ecoSys
							.removeWallet(user.id, guild.id, amount)
							.then((msg) => {
								return interaction.reply({ content: `${member.user} Removed ${amount} to ${user.username}'s wallet` });
							})
							.catch((err) => {
								return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							});
						break;
					case "bank":
						ecoSys
							.removeBank(user.id, guild.id, amount)
							.then((msg) => {
								return interaction.reply({ content: `${member.user} Removed ${amount} to ${user.username}'s bank` });
							})
							.catch((err) => {
								return interaction.reply({ content: `${member.user} sorry ${user.username} does not seem to be in the eco system..`, ephemeral: true });
							});
						break;
				}
				break;
		}
	},
};
