// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Role/roleDelete.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------
// Logs whenever a role is deleted

const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB");

module.exports = {
	name: "roleDelete",
	/**
	 * @param {Role} role
	 */
	async execute(role, client) {
		const Data = await DB.findOne({
			GuildID: role.guild.id,
		});
		if (!Data) return;

		const logsChannel = role.guild.channels.cache.get(Data.RoleLogs);
		const logs = await role.guild.fetchAuditLogs({
			limit: 1,
			type: "ROLE_DELETE",
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		const roleCreateEmbed = new MessageEmbed()
			.setTitle(
				"<:icons_deleterole:866943415895851018> A Role Has Been Deleted"
			)
			.setColor("RED")
			.setTimestamp()
			.setFooter({ text: role.guild.name });

		if (log) {
			// If entry first entry is existing executes code
			roleCreateEmbed.setDescription(
				`> The role \`${role.name}\` has been deleted by \`${log.executor.tag}\``
			);
			logsChannel
				.send({ embeds: [roleCreateEmbed] })
				.catch((err) => console.log(err));
		}
	},
};
