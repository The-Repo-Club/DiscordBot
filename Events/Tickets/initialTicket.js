// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Tickets/initialTicket.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
const {
	ButtonInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");

const {
	roleEveryoneID,
	ticketsCategoryID,
} = require("../../Structures/config.json");

const DB = require("../../Structures/Schemas/ticketsBD"); //Make sure this path is correct

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {ButtonInteraction} interaction
	 */
	async execute(interaction) {
		const { guild, member, customId } = interaction;

		if (!interaction.isButton()) return;
		if (!["user_report", "bug_report", "other_report"].includes(customId))
			return;

		const ID =
			member.displayName + "_" + Math.floor(Math.random() * 90000) + 10000;

		await guild.channels
			.create(`${customId + "_" + ID}`, {
				type: "GUILD_TEXT",
				parent: ticketsCategoryID,
				permissionOverwrites: [
					{
						id: member.id,
						allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
					},
					{
						id: roleEveryoneID,
						deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
					},
				],
			})
			.then(async (channel) => {
				await DB.create({
					GuildID: guild.id,
					MemberID: member.id,
					TicketID: ID,
					ChannelID: channel.id,
					Closed: false,
					Locked: false,
					Type: customId,
				});

				const Embed = new MessageEmbed()
					.setAuthor({
						name: `${guild.name} | Ticket ${ID}`,
						iconURL: guild.iconURL({ dynamic: true }),
					})
					.setDescription(
						"Please wait patiently for a response from a member of Staff, in the mean while, please describe your issue in as much detail as possible."
					)
					.setFooter({ text: "The buttons below are for staff only." });
				if (customId === "user_report") Embed.setColor("BLUE");
				if (customId === "bug_report") Embed.setColor("GREY");
				if (customId === "other_report") Embed.setColor("GREEN");

				const Buttons = new MessageActionRow();
				Buttons.addComponents(
					new MessageButton()
						.setCustomId("close_report")
						.setLabel("Save & Close Ticket")
						.setStyle("PRIMARY")
						.setEmoji("💾"),

					new MessageButton()
						.setCustomId("lock_report")
						.setLabel("Lock Ticket")
						.setStyle("SECONDARY")
						.setEmoji("🔒"),

					new MessageButton()
						.setCustomId("unlock_report")
						.setLabel("Unlock Ticket")
						.setStyle("SUCCESS")
						.setEmoji("🔓")
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
						}, 1 * 5000);
					});

				interaction.reply({
					content: `${member} Your ticket has been created: ${channel}!`,
					ephemeral: true,
				});
			});
	},
};
