/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/paginationSys.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sat 19 March 2022, 04:18:23 AM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 05:18:06 PM [GMT]
 *
 *Description:
 *   paginationSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js,
 **/

const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");

/**
 * Creates a pagination embed
 * @param {Interaction} interaction
 * @param {MessageEmbed[]} pages
 * @param {MessageButton[]} buttonList
 * @param {number} timeout
 * @returns
 */
const paginationEmbed = async (interaction, pages, buttonList, timeout = 120000) => {
	if (!pages) throw new Error("Pages are not given.");
	if (!buttonList) throw new Error("Buttons are not given.");
	if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK") throw new Error("Link buttons are not supported with pagination");
	if (buttonList.length !== 3) throw new Error("Need three buttons.");

	let page = 0;

	const row = new MessageActionRow().addComponents(buttonList);

	//has the interaction already been deferred? If not, defer the reply.
	if (interaction.deferred == false) {
		await interaction.deferReply();
	}

	const curPage = await interaction.editReply({
		embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
		components: [row],
		fetchReply: true,
	});

	const filter = (i) => i.customId === buttonList[0].customId || i.customId === buttonList[1].customId || i.customId === buttonList[2].customId;

	const collector = await curPage.createMessageComponentCollector({
		filter,
		time: timeout,
	});

	collector.on("collect", async (i) => {
		if (i.user.id !== interaction.user.id) {
			return i.reply({ content: "Sorry this interaction does not belong to you.", ephemeral: true });
		}

		switch (i.customId) {
			case buttonList[0].customId:
				page = page > 0 ? --page : pages.length - 1;
				break;
			case buttonList[1].customId:
				page = page + 1 < pages.length ? ++page : 0;
				break;
			case buttonList[2].customId:
				curPage.delete();
				return;
			default:
				break;
		}

		await i.deferUpdate();
		await i.editReply({
			embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
			components: [row],
		});
		collector.resetTimer();
	});

	collector.on("end", (_, reason) => {
		if (reason !== "messageDelete") {
			const disabledRow = new MessageActionRow().addComponents(buttonList[0].setDisabled(true), buttonList[1].setDisabled(true));
			curPage.edit({
				embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
				components: [disabledRow],
			});
		}
	});

	return curPage;
};
module.exports = paginationEmbed;
