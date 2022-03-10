// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Member/presenceUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

// Logs whenever a user status changes
// ❗ in big servers this one might spam the API ❗

const { MessageEmbed, Client, Presence } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "presenceUpdate",
	path: "Member/presenceUpdate.js",
	/**
	 * @param {Presence} oldPresence
	 * @param {Presence} newPresence
	 * @param {Client} client
	 */
	async execute(oldPresence, newPresence, client) {
		if (!oldPresence || !newPresence) return;
		const Data = await DB.findOne({
			GuildID: oldPresence.guild.id,
		});
		if (!Data || !Data.MemberLogs) return;

		const logsChannel = oldPresence.guild.channels.cache.get(Data.MemberLogs);

		const userUpdateEmbed = new MessageEmbed()
			.setColor("ORANGE")
			.setTitle(
				`<:icons_updatestage:949374612926504960> A Member Presence Has Been Updated`
			)
			.setTimestamp()
			.setFooter({ text: oldPresence.guild.name });

		if (oldPresence.status !== newPresence.status) {
			// If status has changed execute code
			userUpdateEmbed
				.setDescription(`> The status of ${oldPresence.member} has ben updated`)
				.addFields(
					{
						name: "Old status",
						value: `\`${oldPresence.status}\``,
					},
					{
						name: "New status",
						value: `\`${newPresence.status}\``,
					}
				);
			logsChannel
				.send({ embeds: [userUpdateEmbed] })
				.catch((err) => console.log(err));
		}
	},
};
