// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Structures/Handlers/commands.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:16:17 pm (GMT)
// -------------------------------------------------------------------------

const { Perms } = require("../Validation/permissions");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
	const Table = new Ascii("Commands Loaded");

	CommandsArray = [];
	(await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
		const command = require(file);
		const cmdName = file.split("/")[6] + "/" + file.split("/")[7];

		if (!command.name)
			return Table.addRow(cmdName, "🟥 FAILED", "Missing a name.");

		if (!command.type && !command.description)
			return Table.addRow(cmdName, "🟥 FAILED", "Missing a description.");

		if (command.permission) {
			if (Perms.includes(command.permission)) command.defaultPermission = false;
			else return Table.addRow(cmdName, "🟥 FAILED", "Permission is invalid.");
		}

		client.commands.set(command.name, command);
		CommandsArray.push(command);

		await Table.addRow(cmdName, "🟩 SUCCESSFUL");
	});

	console.log(Table.toString());

	// PERMISSIONS CHECK //
	client.on("ready", async () => {
		client.guilds.cache.forEach((MainGuild) => {
			MainGuild.commands.set(CommandsArray).then(async (command) => {
				const Roles = (commandName) => {
					const cmdPerms = CommandsArray.find(
						(c) => c.name === commandName
					).permission;
					if (!cmdPerms) return null;

					return MainGuild.roles.cache
						.filter((r) => r.permissions.has(cmdPerms) && !r.managed)
						.first(10);
				};

				const fullPermissions = command.reduce((accumulator, r) => {
					const roles = Roles(r.name);
					if (!roles) return accumulator;

					const permissions = roles.reduce((a, r) => {
						return [...a, { id: r.id, type: "ROLE", permission: true }];
					}, []);

					return [...accumulator, { id: r.id, permissions }];
				}, []);

				await MainGuild.commands.permissions.set({ fullPermissions });
			});
		});

    client.commands.forEach((command) => {
      if (!command.type && command.description)
				client.dashboard.registerCommand(
					command.name,
					command.description,
					"/" + command.name
				);
		});
	});
};
