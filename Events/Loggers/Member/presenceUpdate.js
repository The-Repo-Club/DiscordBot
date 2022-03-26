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

const { MessageEmbed, Presence } = require("discord.js");
const DB = require("../../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const { red, green, orange } = require("../../../Structures/colors.json");

module.exports = {
	name: "presenceUpdate",
	path: "Member/presenceUpdate.js",
	/**
	 * @param {Presence} oldPresence
	 * @param {Presence} newPresence
	 */
	async execute(oldPresence, newPresence) {
		if (!oldPresence || !newPresence) return;
		if (oldPresence.member.user.id || newPresence.member.user.bot) return;
		const Data = await DB.findOne({
			GuildID: oldPresence.guild.id,
		});
		if (!Data || !Data.logs.memberLogs) return;

		const logsChannel = oldPresence.guild.channels.cache.get(Data.logs.memberLogs);

		const userUpdateEmbed = new MessageEmbed().setTimestamp().setFooter({ text: oldPresence.guild.name });

		if (newPresence.status === "online") {
			userUpdateEmbed.setColor(green).setTitle(`<:icons_startstage:949374613241077792> A Member Presence Has Been Updated`);
		} else if (newPresence.status === "offline") {
			userUpdateEmbed.setColor(red).setTitle(`<:icons_endstage:949374613027160105> A Member Presence Has Been Updated`);
		} else {
			userUpdateEmbed.setColor(orange).setTitle(`<:icons_updatestage:949374612926504960> A Member Presence Has Been Updated`);
		}

		if (oldPresence.status !== newPresence.status) {
			// If status has changed execute code
			userUpdateEmbed.setDescription(`> The status of ${oldPresence.member} has ben updated`).addFields(
				{
					name: "Old status",
					value: `\`${oldPresence.status}\``,
				},
				{
					name: "New status",
					value: `\`${newPresence.status}\``,
				}
			);
			logsChannel.send({ embeds: [userUpdateEmbed] }).catch((err) => console.log(err));
		}
	},
};
