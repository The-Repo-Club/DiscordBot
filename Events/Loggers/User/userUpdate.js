// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Message/messageUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------
const { MessageEmbed, Client, User, UserFlags } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "userUpdate",
	/**
	 * @param {User} oldUser
	 * @param {User} newUser
	 * @param {Client} client
	 */
	async execute(oldUser, newUser, client) {
		const guild = client.guilds.cache.get("945963538474754058"); // Enter your guild ID

		const Data = await DB.findOne({
			GuildID: guild.id,
		});
		if (!Data) return;

		const logsChannel = guild.channels.cache.get(Data.Logs);

		const userUpdateEmbed = new MessageEmbed()
			.setColor("ORANGE")
			.setTitle(` A User Has Been Updated`)
			.setTimestamp()
			.setFooter({ text: guild.name });

		if (oldUser.username !== newUser.username) {
			// If username changed execute code
			userUpdateEmbed
				.setDescription(`The user ${newUser} changed their username`)
				.addFields(
					{
						name: "Old username",
						value: `\`${oldUser.username}\``,
					},
					{
						name: "New username",
						value: `\`${newUser.username}\``,
					}
				);
		}

		if (oldUser.discriminator !== newUser.discriminator) {
			// If discriminator changed execute code
			userUpdateEmbed
				.setDescription(`The user ${newUser} changed their discriminator`)
				.addFields(
					{
						name: "Old discriminator",
						value: `\`${oldUser.discriminator}\``,
					},
					{
						name: "New discriminator",
						value: `\`${newUser.discriminator}\``,
					}
				);
		}

		// if (oldUser.flags.bitfield != newUser.flags.bitfield) {
		// 	// If flags changed execute code
		// 	const newFlags = new UserFlags(newUser.flags.bitfield)
		// 		.toArray()
		// 		.slice(" ")
		// 		.map((e) => `\`${e}\``)
		// 		.join(" ")
		// 		.toLowerCase()
		// 		.replaceAll("_", " ");
		// 	userUpdateEmbed
		// 		.setDescription(`The user ${newUser} changed their flags`)
		// 		.addField("New flags", newFlags || "No flags anymore");
		// }
		// console.log(logsChannel);
		// if (oldUser.avatar !== newUser.avatar) {
		// 	// If avatar changed execute code
		// 	userUpdateEmbed
		// 		.setDescription(`The user ${newUser} changed their avatar`)
		// 		.setImage(newUser.avatarURL({ dynamic: true }))
		// 		.addFields(
		// 			{
		// 				name: "Old avatar",
		// 				value: oldUser.avatar
		// 					? `${oldUser.avatarURL({ dynamic: true })}`
		// 					: "No avatar before",
		// 			},
		// 			{
		// 				name: "New avatar",
		// 				value: newUser.avatar
		// 					? `${newUser.avatarURL({ dynamic: true })}`
		// 					: "No new avatar",
		// 			}
		// 		);
		// }

		if (oldUser.banner !== newUser.banner) {
			// If banner changed execute code
			userUpdateEmbed
				.setDescription(`The user ${newUser} changed their avatar`)
				.setImage(newUser.bannerURL({ dynamic: true }))
				.addFields(
					{
						name: "Old banner",
						value: oldUser.banner
							? `${oldUser.bannerURL({ dynamic: true })}`
							: "No banner before",
					},
					{
						name: "New banner",
						value: newUser.banner
							? `${newUser.bannerURL({ dynamic: true })}`
							: "No new banner",
					}
				);
		}

		logsChannel
			.send({ embeds: [userUpdateEmbed] })
			.catch((err) => console.log(err));
	},
};
