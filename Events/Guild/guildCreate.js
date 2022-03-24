/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/Guild/guildCreate.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 08:40:58 PM [GMT]
 *
 *Description:
 *   guildCreate Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, util, glob, colors.json, config.json
 **/

const { Client, MessageEmbed } = require("discord.js");
const { green } = require("../../Structures/colors.json");
const { botsDevID } = require("../../Structures/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);

module.exports = {
	name: "guildCreate",
	path: "Guild/guildCreate.js",
	once: true,
	/**
	 * @param {Client} client
	 * @param {Guild} guild
	 */
	async execute(guild, client) {
		CommandsArray = [];
		(await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
			const command = require(file);

			client.commands.set(command.name, command);
			CommandsArray.push(command);
		});

		client.guilds.cache.forEach((MainGuild) => {
			client.application.commands.set(CommandsArray).then(async (command) => {
				const Roles = (commandName) => {
					const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
					if (!cmdPerms) return null;

					return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms) && !r.managed).first(10);
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

		const embed = new MessageEmbed()
			.setTitle("Joined a new Guild") //u can change "Guild" to "Server"
			.setAuthor({ name: `${client.user.tag}`, iconURL: client.user.displayAvatarURL() })
			.setColor(green)
			.addField("**Guild Info**", ` \`${guild.name} (${guild.id})\``, false)
			.addField("**Owner Info**", `<@${guild.ownerId}> ${guild.owner.username}`, false)
			.addField("**Server Member Count**", ` \`${guild.memberCount}\``, false)
			.addField("**Total Servers**", ` \`${client.guilds.cache.size}\``, false)
			.addField("**Total Member count**", ` \`${client.users.cache.size}\``, false)
			.setTimestamp()
			.setThumbnail(guild.iconURL({ dynamic: true }));

		const Owner = client.users.cache.get(botsDevID);

		Owner.send({ embeds: [embed] });
	},
};
