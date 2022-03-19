/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/inviteSys.js
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
 *   inviteSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, channelsDB, config.json
 **/

const { Client } = require("discord.js");
const { botsGuildID } = require("../Structures/config.json");
const DB = require("../Structures/Schemas/channelsDB");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	const Data = await DB.findOne({
		GuildID: botsGuildID,
	});
	if (!Data || !Data.inviteChannelID) return;

	const guild = client.guilds.cache.get(botsGuildID);
	if (!guild) return;
	const inviteChannel = guild.channels.cache.get(Data.inviteChannelID);
	const invite = await inviteChannel.createInvite();
	return invite.code;
};
