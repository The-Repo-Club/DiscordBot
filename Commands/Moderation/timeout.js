/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Moderation/timeout.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:05:21 PM [GMT]
 *
 *Description:
 *   Timeout Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const { red, green } = require("../../Structures/colors.json");
const ms = require("ms");

module.exports = {
	name: "timeout",
	path: "Moderation/timeout.js",
	description: "Mute System",
	permission: "MANAGE_MESSAGES",
	options: [
		{
			name: "mute",
			description: "Timeout A User",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "Provide A User To The Timeout.",
					type: "USER",
					required: true,
				},
				{
					name: "length",
					description:
						"Provide Length For Timeout... [ 1 Second Up To 28 Days ]  ",
					type: "STRING",
					required: true,
				},
				{
					name: "reason",
					description: "Provide A Reason For The Timeout",
					type: "STRING",
					required: false,
				},
			],
		},
		{
			name: "unmute",
			description: "Untimeout A User",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "Provide A User To Untimeout.",
					type: "USER",
					required: true,
				},
				{
					name: "reason",
					description: "Provide A Reason For The Untimeout",
					type: "STRING",
					required: false,
				},
			],
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const options = interaction.options;
		const target = options.getMember("user");
		const length = options.getString("length");
		const reason = options.getString("reason") || "No Reason Provided";
		const maxtime = ms("28d");
		if (length) timeInMs = ms(length);

		try {
			switch (options.getSubcommand()) {
				case "mute": {
					if (target.id === interaction.member.id)
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setTitle("❌ Error ❌")
									.setColor(red)
									.setDescription(
										`Hey... ${interaction.user.username} Why Are You Trying To Mute Yourself....?`
									)
									.setTimestamp(),
							],
							ephemeral: true,
						});
					if (target.permissions.has("ADMINISTRATOR"))
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setTitle("❌ Error ❌")
									.setColor(red)
									.setDescription(`${target.user.username} Is An Admin....?`)
									.setTimestamp(),
							],
							ephemeral: true,
						});
					if (!timeInMs)
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setTitle("❌ Error ❌")
									.setColor(red)
									.setDescription("Please Specify A Valid Time!")
									.setTimestamp(),
							],
							ephemeral: true,
						});
					if (timeInMs > maxtime)
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setTitle("❌ Error ❌")
									.setColor(red)
									.setDescription(
										"Please Specify A Time Between 1 Second, And 28 Days!"
									)
									.setTimestamp(),
							],
							ephemeral: true,
						});
					if (reason.length > 512)
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setTitle("❌ Error ❌")
									.setColor(red)
									.setDescription("Reason Can't Be More Than 512 Characters")
									.setTimestamp(),
							],
							ephemeral: true,
						});
					target.timeout(timeInMs, reason);
					return interaction.reply({
						embeds: [
							new MessageEmbed()
								.setColor(green)
								.setTitle(`Successfully Muted!`)
								.addFields(
									{
										name: "User:",
										value: `\`\`\`${target.user.username}\`\`\``,
									},
									{
										name: "Reason:",
										value: `\`\`\`${reason}\`\`\``,
									},
									{
										name: "Time Of Mute:",
										value: `\`\`\`${length}\`\`\``,
									}
								),
						],
						ephemeral: true,
					});
				}
				case "unmute":
					{
						if (target.permissions.has("ADMINISTRATOR"))
							return interaction.reply({
								embeds: [
									new MessageEmbed()
										.setTitle("❌ Error ❌")
										.setColor(red)
										.setDescription(`${target.user.username} Is An Admin....?`)
										.setTimestamp(),
								],
								ephemeral: true,
							});
						if (!target.communicationDisabledUntilTimestamp)
							return interaction.reply({
								embeds: [
									new MessageEmbed()
										.setTitle("❌ Error ❌")
										.setColor(red)
										.setDescription(`${target.user.username} Isn't Muted?`)
										.setTimestamp(),
								],
								ephemeral: true,
							});
						await target.timeout(null);
						return interaction.reply({
							embeds: [
								new MessageEmbed()
									.setColor(green)
									.setTitle("Successfully Unmuted!")
									.addFields(
										{
											name: "User:",
											value: `\`\`\`${target.user.username}\`\`\``,
										},
										{
											name: "Reason:",
											value: `\`\`\`${reason}\`\`\``,
										}
									),
							],
							ephemeral: true,
						});
					}
					return;
			}
		} catch (e) {
			const errorEmbed = new MessageEmbed()
				.setColor(red)
				.setDescription(`🛑 Error: ${e}`);
			return interaction.reply({
				embeds: [errorEmbed],
			});
		}
	},
};
