const { Client } = require("discord.js");
const lockdownDB = require("../Structures/Schemas/lockdownDB");

/**
 * @param {Client}
 */
module.exports = async (client) => {
	lockdownDB.find().then(async (documentsArray) => {
		documentsArray.forEach((doc) => {
			const Channel = client.guild.cache
				.get(doc.GuildID)
				.channels.cache.get(doc.ChannelID);
			if (!Channel) return;

			const TimeNow = Date.now();
			if (doc.time < TimeNow)
				return Channel.permissionsOverwrites.edit(d.GuildID, {
					SEND_MESSAGES: null,
				});

			const expDate = doc.Time - Date.now();

			setTimeout(async () => {
				Channel.permissionOverwrites.edit(d.GuildID, {
					SEND_MESSAGES: null,
				});
				await lockdownDB.deleteOne({ ChannelID: Channel.id });
			}, expDate);
		});
	});
};
