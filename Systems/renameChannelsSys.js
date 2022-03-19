/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/renameChannelsSys.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sat 19 March 2022, 04:18:23 AM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 04:24:17 AM [GMT]
 *
 *Description:
 *   renameChannelsSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, channelsDB, config.json
 **/

const { Client } = require("discord.js");
const { botsGuildID } = require("../Structures/config.json");
const DB = require("../Structures/Schemas/channelsDB");
const ms = require("ms");

/**
 * @param {Client} client
 */
module.exports = (client) => {
	let mc = 0;
	let bc = 0;
	let rc = 0;
	let cc = 0;
	let boc = 0;

	setInterval(async function () {
		const Data = await DB.findOne({
			GuildID: botsGuildID,
		});
		if (!Data || !Data.status.membersID) return;

		const guild = client.guilds.cache.get(botsGuildID);
		var memberCount = guild.members.cache.filter((member) => member.user.bot).size.toLocaleString();
		if (memberCount !== mc) {
			const botsChannel = guild.channels.cache.get(Data.status.membersID);
			mc = memberCount;
			return await botsChannel.setName(`Bot Count: ${memberCount}`);
		}
	}, ms("5m"));

	setInterval(async function () {
		const Data = await DB.findOne({
			GuildID: botsGuildID,
		});
		if (!Data || !Data.status.botsID) return;

		const guild = client.guilds.cache.get(botsGuildID);
		var botCount = guild.members.cache.filter((member) => !member.user.bot).size.toLocaleString();
		if (botCount !== bc) {
			const botsChannel = guild.channels.cache.get(Data.status.botsID);
			bc = botCount;
			return await botsChannel.setName(`Members Count: ${botCount}`);
		}
	}, ms("5m"));

	setInterval(async function () {
		const Data = await DB.findOne({
			GuildID: botsGuildID,
		});
		if (!Data || !Data.status.rolesID) return;

		const guild = client.guilds.cache.get(botsGuildID);
		var roleCount = (guild.roles.cache.size - 1).toLocaleString();
		if (roleCount !== rc) {
			const rolesChannel = guild.channels.cache.get(Data.status.rolesID);
			rc = roleCount;
			return await rolesChannel.setName(`Roles Count: ${roleCount}`);
		}
	}, ms("5m"));

	setInterval(async function () {
		const Data = await DB.findOne({
			GuildID: botsGuildID,
		});
		if (!Data || !Data.status.channelsID) return;

		const guild = client.guilds.cache.get(botsGuildID);
		var channelsCount = guild.channels.cache.filter((c) => c.type === "GUILD_TEXT" || c.type === "GUILD_VOICE").size.toLocaleString();
		if (channelsCount !== cc) {
			const channelsChannel = guild.channels.cache.get(Data.status.channelsID);
			cc = channelsCount;
			return await channelsChannel.setName(`Channels Count: ${channelsCount}`);
		}
	}, ms("5m"));

	setInterval(async function () {
		const Data = await DB.findOne({
			GuildID: botsGuildID,
		});
		if (!Data || !Data.status.premiumsID) return;

		const guild = client.guilds.cache.get(botsGuildID);
		var boostsCount = guild.premiumSubscriptionCount.toLocaleString();
		if (boostsCount !== boc) {
			const channelsChannel = guild.channels.cache.get(Data.status.premiumsID);
			boc = boostsCount;
			return await channelsChannel.setName(`Boosts Count: ${boostsCount}`);
		}
	}, ms("5m"));
};
