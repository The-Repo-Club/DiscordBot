const { Client } = require("discord.js");
const DB = require("../Structures/Schemas/channelsDB"); //Make sure this path is correct

async function getField(guild, field) {
	const info = await DB.findOne({
		GuildID: guild.id,
	});

	switch (field) {
		case "Announcement Channel":
			return info.announcementChannelID;

		case "Commands Channel":
			return info.commandsChannelID;

		case "Invite Channel":
			return info.inviteChannelID;
	}
}

async function addTextField(discordClient, field, description, len = 5) {
	const validate = (prefix) => prefix.length <= len;
	const set = (discordClient, guild, value) =>
		(discordClient.prefixes[guild.id] = value);
	const get = (discordClient, guild) => getField(guild, field) || null;

	discordClient.dashboard.addTextInput(field, description, validate, set, get);
}

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	addTextField(
		client,
		"Announcement Channel",
		"The channel in which announcement are sent to."
	);
	addTextField(
		client,
		"Commands Channel",
		"The channel in which commands can be ran."
	);
	addTextField(
		client,
		"Invite Channel",
		"The channel in which new users will be invited to."
	);
};
