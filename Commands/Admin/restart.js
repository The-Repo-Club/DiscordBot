/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/restart.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Wed 23 March 2022, 12:22:54 AM [GMT]
 *
 *Description:
 *   Restart Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, config.json
 **/

const { CommandInteraction, Client, MessageEmbed, Collection } = require("discord.js");
const { Token, ownerIDS } = require("../../Structures/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
require("../../Structures/Handlers/errors");
const { purple } = require("../../Structures/colors.json");

module.exports = {
	name: "restart",
	path: "Admin/restart.js",
	description: "Restart Bot",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { guild, member } = interaction;
		if (!ownerIDS.includes(member.id)) {
			return interaction.reply({
				content: "You do not have permission to restart this bot",
			});
		}
		await interaction
			.reply({ content: "Restarting...", ephemeral: true })
			.then(() => {
				client.destroy();
				console.log(`[Client] Restarting by ${member.user.username} in ${guild.name}`);
			})
			.then(() => {
				client.buttons = new Collection();
				client.commands = new Collection();
				client.cooldowns = new Collection();
				client.maintenance = false;

				["renameChannelsSys", "cooldownSys", "lockdownSys"].forEach((system) => {
					require(`../../Systems/${system}`)(client);
				});

				["buttons", "commands", "events", "loggers", "modals"].forEach((handler) => {
					require(`../../Structures/Handlers/${handler}`)(client, PG, Ascii).catch((err) => console.log(err));
				});

				client.login(Token).catch((err) => console.log(err));
				client.login(Token);
				console.log("[Client] Ready");
				for (var i = 0; i < ownerIDS.length; i++) {
					var owner = client.users.cache.get(ownerIDS[i]);

					owner.send({
						embeds: [new MessageEmbed().setColor(purple).setTitle("[Client] Restarted by").setDescription(`${member.user.username} in ${guild.name}`)],
					});
				}
			});
	},
};
