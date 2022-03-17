/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Tickets/ticket.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:06:02 PM [GMT]
 *
 *Description:
 *   Ticket Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ticketsSetupDB
 **/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/ticketsDB"); //Make sure this path is correct
const { red, green } = require("../../Structures/colors.json");

module.exports = {
	name: "ticket",
	path: "Tickets/ticket.js",
	description: "Ticket actions.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "action",
			type: "STRING",
			description: "Add and remove a member this ticket.",
			required: true,
			choices: [
				{ name: "Add", value: "add" },
				{ name: "Remove", value: "remove" },
			],
		},
		{
			name: "member",
			type: "USER",
			description: "Select a member.",
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const { guildId, options, channel } = interaction;

		const Action = options.getString("action");
		const Member = options.getMember("member");

		const Embed = new MessageEmbed();

		switch (Action) {
			case "add":
				DB.findOne(
					{ GuildID: guildId, ChannelID: channel.id },
					async (err, docs) => {
						if (err) throw err;
						if (!docs)
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This is not a ticket channel."
									),
								],
								ephemeral: true,
							});
						if (docs.MembersID.includes(Member.id))
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This member is already part of this ticket."
									),
								],
								ephemeral: true,
							});
						docs.MembersID.push(Member.id);
						channel.permissionOverwrites.edit(Member.id, {
							SEND_MESSAGES: true,
							VIEW_CHANNEL: true,
							READ_MESSAGE_HISTORY: true,
						});

						interaction.reply({
							embeds: [
								Embed.setColor(green).setDescription(
									`✅ | ${Member} has been added to the ticket.`
								),
							],
						});
						docs.save();
					}
				);
				break;
			case "remove":
				DB.findOne(
					{ GuildID: guildId, ChannelID: channel.id },
					async (err, docs) => {
						if (err) throw err;
						if (!docs)
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This is not a ticket channel."
									),
								],
								ephemeral: true,
							});
						if (!docs.MembersID.includes(Member.id))
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This member is not part of this ticket."
									),
								],
								ephemeral: true,
							});
						docs.MembersID.remove(Member.id);
						channel.permissionOverwrites.delete(Member.id);

						interaction.reply({
							embeds: [
								Embed.setColor(green).setDescription(
									`✅ | ${Member} has been removed from the ticket.`
								),
							],
						});
						docs.save();
					}
				);
				break;
		}
	},
};
