// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Role/roleCreate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------
// Logs whenever a role is created

const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB");

module.exports = {
	name: "roleCreate",
	/**
	 * @param {Role} role
	 */
	async execute(role, client) {
		const Data = await DB.findOne({
			GuildID: role.guild.id,
		});
		if (!Data) return;

		const logsChannel = role.guild.channels.cache.get(Data.Logs);
		const logs = await role.guild.fetchAuditLogs({
			limit: 1,
			type: "ROLE_CREATE",
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		const roleCreateEmbed = new MessageEmbed()
			.setTitle(
				"<:icons_createrole:866943415774478388> A Role Has Been Created"
			)
			.setColor("GREEN")
			.setTimestamp()
			.setFooter({ text: role.guild.name });

		if (log) {
			// If entry first entry is existing executes code
			roleCreateEmbed
				.setDescription(
					`> The role \`${role.name}\` has been created by \`${log.executor.tag}\``
				)
				.addFields(
					{
						name: "Color",
						value: `\`${role.color}\``,
						inline: true,
					},
					{
						name: "Hoisted",
						value: role.hoist ? "`Yes`" : "`No`",
						inline: true,
					},
					{
						name: "Mentionable",
						value: role.mentionable ? "`Yes`" : "`No`",
						inline: true,
					},
					{
						name: "Position",
						value: `\`${role.position - 1}\``,
						inline: true,
					}
				);

			if (role.permissions.bitfield) {
				// If bitfield of allowed permissions is different than 0 (null) maps all the allowed permissions
				const p =
					new Permissions(role.permissions.bitfield)
						.toArray()
						.slice(" ")
						.map((e) => `\`${e}\``)
						.join(" ")
						.toLowerCase()
						.replaceAll("_", " ") || "None";

				roleCreateEmbed.addField("Permissions", p);
			}

			logsChannel
				.send({ embeds: [roleCreateEmbed] })
				.catch((err) => console.log(err));
		}
	},
};
