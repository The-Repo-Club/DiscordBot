// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Admin/ping.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)

const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { Token } = require("../../Structures/config.json");

const ownerIDS = ["861270236475817994"];

module.exports = {
	name: "restart",
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
								.setColor("PURPLE")
								.setTitle("[Client] Restarted by")
								.setDescription(`${member.user.username} in ${guild.name}`),
						],
					});
				}
			});
	},
};
