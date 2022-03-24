/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Interaction/interactionCreate.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 06:15:50 PM [GMT]
 *
 *Description:
 *   interactionCreate Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, cooldownsDB, channelsDB
 **/

const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const cooldownsDB = require("../../Structures/Schemas/cooldownsDB");
const channelsDB = require("../../Structures/Schemas/channelsDB");
const { red, yellow } = require("../../Structures/colors.json");
const { botsDevID } = require("../../Structures/config.json");

module.exports = {
	name: "interactionCreate",
	path: "Interaction/interactionCreate.js",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { guildId, guild, user, member } = interaction;
		if (!interaction.channel)
			return (
				interaction.reply({
					embeds: [new MessageEmbed().setColor(red).setDescription("🟥 Sorry slash commands dont work in DM.").setTimestamp()],
				}) && client.commands.delete(interaction.commandName)
			);

		if (client.maintenance && interaction.user.id != botsDevID) {
			const Response = new MessageEmbed().setTitle("👷‍♂️ MAINTENANCE 👷‍♂️").setDescription("Sorry the bot will be back shortly when everything is working correctly.").setColor(red);

			return interaction.reply({ embeds: [Response] });
		}

		if (interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.commands.get(interaction.commandName);
			if (command) {
				const CommandName = command.name.replace(" ", "").toLowerCase();

				if (command.cooldown) {
					const cooldown = client.cooldowns.get(`${guildId}||${CommandName}||${user.id}`) - Date.now();
					const time = Math.floor(cooldown / 1000) + "";

					const Data = await cooldownsDB.findOne({
						Details: `${guildId}||${CommandName}||${user.id}`,
					});

					if (!Data) {
						await cooldownsDB.create({
							Details: `${guildId}||${CommandName}||${user.id}`,
							Time: Date.now() + command.cooldown,
						});
					}

					if (client.cooldowns.has(`${guildId}||${CommandName}||${user.id}`))
						return interaction.reply({
							embeds: [new MessageEmbed().setColor(yellow).setDescription(`🟥 ${interaction.user} The __cooldown__ for **${command.name}** is still active.\nYou have to wait for another \` ${time.split(".")[0]} \` *second(s)*.`)],
							ephemeral: true,
						});

					// if (user.id != guild.ownerId) {
					client.cooldowns.set(`${guildId}||${CommandName}||${user.id}`, Date.now() + command.cooldown);
					// }

					setTimeout(async () => {
						client.cooldowns.delete(`${guildId}||${CommandName}||${user.id}`);
						await cooldownsDB.findOneAndDelete({
							Details: `${guildId}||${CommandName}||${user.id}`,
						});
					}, command.cooldown);
				}
			}

			if (!command)
				return (
					interaction.reply({
						embeds: [new MessageEmbed().setColor(red).setDescription("🟥 An error occurred while running this command.").setTimestamp()],
					}) && client.commands.delete(interaction.commandName)
				);

			const Data = await channelsDB.findOne({
				GuildID: guild.id,
			});

			if (!Data && member.permissions.has("ADMINISTRATOR")) return command.execute(interaction, client);

			if (!Data || !Data.commandsChannelID)
				return interaction.reply({
					content: `❌ This server has not setup the commands system.`,
					ephemeral: true,
				});

			if (interaction.channel.id != Data.commandsChannelID && !member.permissions.has("ADMINISTRATOR"))
				return interaction.reply({
					content: `You cannot use ${client.user.tag} commands in this channel try <#${Data.commandsChannelID}>`,
					ephemeral: true,
				});
			command.execute(interaction, client);
		}
	},
};
