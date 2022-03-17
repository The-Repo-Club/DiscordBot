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
 *   Thu 17 March 2022, 01:10:02 PM [GMT]
 *
 *Description:
 *   Restart Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, config.json
 **/

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { Token, ownerIDS } = require("../../Structures/config.json");
const { purple } = require("../../Structures/colors.json");

module.exports = {
	name: "restart",
	path: "Admin/restart.js",
	description: "Restart Bot",
	permission: "ADMINISTRATOR",
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
				console.log(
					`[Client] Restarting by ${member.user.username} in ${guild.name}`
				);
			})
			.then(() => {
				client.login(Token);
				console.log("[Client] Ready");
				for (var i = 0; i < ownerIDS.length; i++) {
					var owner = client.users.cache.get(ownerIDS[i]);

					owner.send({
						embeds: [
							new MessageEmbed()
								.setColor(purple)
								.setTitle("[Client] Restarted by")
								.setDescription(`${member.user.username} in ${guild.name}`),
						],
					});
				}
			});
	},
};
