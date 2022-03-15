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
	const inviteChannel = guild.channels.cache.get(Data.inviteChannelID);
	const invite = await inviteChannel.createInvite();
	return invite.code;
};
