const { Client } = require("discord.js");
const { botsGuildID } = require("../Structures/config.json");
const DB = require("../Structures/Schemas/inviteDB");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	const Data = await DB.findOne({
		GuildID: botsGuildID,
	});
	if (!Data || !Data.inviteChannel) return;

	const guild = client.guilds.cache.get(botsGuildID);
	const inviteChannel = guild.channels.cache.get(Data.inviteChannel);
	const invite = await inviteChannel.createInvite();
	return invite.code;
};
