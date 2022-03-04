// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Tickets/initialTicket.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const {
	ButtonInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");
const ms = require("ms");

const ticketsDB = require("../../Structures/Schemas/ticketsDB"); //Make sure this path is correct
const ticketsSetupDB = require("../../Structures/Schemas/ticketsSetupDB"); //Make sure this path is correct

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {ButtonInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, member, customId } = interaction;

		if (!interaction.isButton()) return;

		const Data = await ticketsSetupDB.findOne({ GuildID: guild.id });
		if (!Data) return;

		if (!Data.Buttons.includes(customId)) return;

		const ID =
			member.displayName + "_" + Math.floor(Math.random() * 90000) + 10000;

		await guild.channels
			.create(`${customId + "_" + ID}`, {
				type: "GUILD_TEXT",
				parent: Data.Category,
				permissionOverwrites: [
					{
						id: member.id,
						allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
					},
					{
						id: Data.GuildID,
						deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
					},
				],
			})
			.then(async (channel) => {
				await ticketsDB.create({
					GuildID: guild.id,
					MembersID: member.id,
					TicketID: ID,
					ChannelID: channel.id,
					Closed: false,
					Locked: false,
					Type: customId,
					Claimed: false,
					ClaimedBy: null,
				});

				const Embed = new MessageEmbed()
					.setAuthor({
						name: `${guild.name} | Ticket ${ID}`,
						iconURL: guild.iconURL({ dynamic: true }),
					})
					.setColor("GREY")
					.setDescription(
						"Please wait patiently for a response from a member of Staff, in the mean while, please describe your issue in as much detail as possible."
					)
					.setFooter({ text: "The buttons below are for staff only." });

				const Buttons = new MessageActionRow();
				Buttons.addComponents(
					new MessageButton()
						.setCustomId("close_report")
						.setLabel("Save & Close")
						.setStyle("PRIMARY")
						.setEmoji("💾"),

					new MessageButton()
						.setCustomId("lock_report")
						.setLabel("Lock")
						.setStyle("DANGER")
						.setEmoji("🔒"),

					new MessageButton()
						.setCustomId("unlock_report")
						.setLabel("Unlock")
						.setStyle("SUCCESS")
						.setEmoji("🔓"),

					new MessageButton()
						.setCustomId("claim_report")
						.setLabel("Claim")
						.setStyle("SECONDARY")
						.setEmoji("🛄")
				);
				channel.send({
					embeds: [Embed],
					components: [Buttons],
				});
				await channel
					.send({
						content: `${member} Here is your ticket!`,
					})
					.then((m) => {
						setTimeout(() => {
							m.delete().catch(() => {});
						}, ms("5s"));
					});

				interaction.reply({
					content: `${member} Your ticket has been created: ${channel}!`,
					ephemeral: true,
				});
			});
	},
};
