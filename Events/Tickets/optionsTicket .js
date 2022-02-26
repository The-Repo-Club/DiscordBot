// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Tickets/initialTicket.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");

const { ticketsTranscriptsID } = require("../../Structures/config.json");

const DB = require("../../Structures/Schemas/ticketsBD"); //Make sure this path is correct

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {ButtonInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, member, customId, channel } = interaction;

		if (!interaction.isButton()) return;
		if (!member.permissions.has("ADMINISTRATOR"))
			return interaction.reply({
				content: "You can not use these buttons.",
				ephemeral: true,
			});
		if (!["close_report", "lock_report", "unlock_report"].includes(customId))
			return;

		const Embed = new MessageEmbed().setColor("#8130D7");

		DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
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
					await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

					const MEMBER = guild.members.cache.get(docs.MemberID);
					const Message = await guild.channels.cache
						.get(ticketsTranscriptsID)
						.send({
							embeds: [
								Embed.setAuthor({
									name: MEMBER.user.tag,
									iconURL: MEMBER.user.displayAvatarURL({ dynamic: true }),
								}).setTitle(
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
					}, 10 * 1000);
					break;

				case "lock_report":
					if (docs.Locked == true)
						return interaction.reply({
							content: "The ticket is already locked.",
							ephemeral: true,
						});
					await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
					Embed.setDescription("🔒 | This ticket is now locked for review.");
					channel.permissionOverwrites.edit(docs.MemberID, {
						SEND_MESSAGES: false,
					});
					interaction.reply({ embeds: [Embed] });
					break;
				case "unlock_report":
					if (docs.Locked == false)
						return interaction.reply({
							content: "The ticket is already unlocked.",
							ephemeral: true,
						});
					await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
					Embed.setDescription("🔓 | This ticket is now unlocked.");
					channel.permissionOverwrites.edit(docs.MemberID, {
						SEND_MESSAGES: true,
					});
					interaction.reply({ embeds: [Embed] });
					break;
			}
		});
	},
};
