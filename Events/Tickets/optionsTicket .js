// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Tickets/optionsTicket.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const ms = require("ms");

const ticketsDB = require("../../Structures/Schemas/ticketsDB"); //Make sure this path is correct
const ticketsSetupDB = require("../../Structures/Schemas/ticketsSetupDB"); //Make sure this path is correct

module.exports = {
	name: "interactionCreate",
	path: "Tickets/optionsTicket.js",
	/**
	 * @param {ButtonInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, member, customId, channel } = interaction;

		if (!interaction.isButton()) return;

		const Data = await ticketsSetupDB.findOne({ GuildID: guild.id });
		if (!Data)
			return interaction.reply({
				content: "The data for this system is out of date.",
			});

		if (
			![
				"close_report",
				"lock_report",
				"unlock_report",
				"claim_report",
			].includes(customId)
		)
			return;

		if (!member.roles.cache.find((r) => r.id === Data.Handlers))
			return interaction.reply({
				content: "You can not use these buttons.",
				ephemeral: true,
			});

		const Embed = new MessageEmbed().setColor("#8130D7");

		ticketsDB.findOne({ ChannelID: channel.id }, async (err, docs) => {
			if (err) throw err;
			if (!docs)
				return interaction.reply({
					content: "No data was found for this ticket, please delete manually.",
					ephemeral: true,
				});
			switch (customId) {
				case "close_report":
					if (docs.Closed == true)
						return interaction.reply({
							content:
								"The ticket is already closed, please wait for the ticket to be removed.",
							ephemeral: true,
						});
					const attachment = await createTranscript(channel, {
						limit: -1,
						returnBuffer: false,
						fileName: `${docs.Type}_${docs.TicketID}.html`,
					});
					await ticketsDB.updateOne(
						{ ChannelID: channel.id },
						{ Closed: true }
					);

					const Message = await guild.channels.cache.get(Data.Transcript).send({
						embeds: [
							Embed.setTitle(
								`Transcript Type: ${docs.Type} \n ID: ${docs.TicketID}`
							),
						],
						files: [attachment],
					});
					interaction.reply({
						embeds: [
							Embed.setDescription(
								`The transcript is now saved [TRANSCRIPT](${Message.url})`
							),
						],
					});

					setTimeout(() => {
						channel.delete();
					}, ms("10s"));
					break;

				case "lock_report":
					if (docs.Locked == true)
						return interaction.reply({
							content: "The ticket is already locked.",
							ephemeral: true,
						});
					await ticketsDB.updateOne(
						{ ChannelID: channel.id },
						{ Locked: true }
					);
					Embed.setDescription("🔒 | This ticket is now locked for review.");

					docs.MembersID.forEach((m) => {
						channel.permissionOverwrites.edit(m, {
							SEND_MESSAGES: false,
						});
					});

					interaction.reply({ embeds: [Embed] });
					break;
				case "unlock_report":
					if (docs.Locked == false)
						return interaction.reply({
							content: "The ticket is already unlocked.",
							ephemeral: true,
						});
					await ticketsDB.updateOne(
						{ ChannelID: channel.id },
						{ Locked: false }
					);
					Embed.setDescription("🔓 | This ticket is now unlocked.");
					docs.MembersID.forEach((m) => {
						channel.permissionOverwrites.edit(m, {
							SEND_MESSAGES: true,
						});
					});
					interaction.reply({ embeds: [Embed] });
					break;
				case "claim_report":
					if (docs.Claimed == true)
						if (docs.ClaimedBy === member.id) {
							return interaction.reply({
								content: `You have already claimed this ticket.`,
								ephemeral: true,
							});
						} else {
							return interaction.reply({
								content: `This ticket has already been claimed by <@${docs.ClaimedBy}>`,
								ephemeral: true,
							});
						}

					await ticketsDB.updateOne(
						{ ChannelID: channel.id },
						{ Claimed: true, ClaimedBy: member.id }
					);

					Embed.setDescription(
						`🛄 | This tickets has been claimed by ${member}`
					);
					interaction.reply({ embeds: [Embed] });

					break;
			}
		});
	},
};
