/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/User/userUpdate.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Mon 14 March 2022, 10:33:50 PM [GMT]
 *
 *Description:
 *   Announcement Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, logsDB
 **/

const { MessageEmbed, User, UserFlags } = require("discord.js");
const DB = require("../../../Structures/Schemas/logsDB"); //Make sure this path is correct

module.exports = {
	name: "userUpdate",
	path: "User/userUpdate.js",
	/**
	 * @param {User} oldUser
	 * @param {User} newUser
	 */
	async execute(oldUser, newUser, client) {
		const guild = client.guilds.cache.get("945963538474754058");

		const Data = await DB.findOne({
			GuildID: guild.id,
		});
		if (!Data || !Data.UserLogs) return;

		const logsChannel = guild.channels.cache.get(Data.UserLogs);

		const userUpdateEmbed = new MessageEmbed()
			.setColor("ORANGE")
			.setTitle(
				`<:icons_updatemember:949375652291809341> A User Has Been Updated`
			)
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
			logsChannel
				.send({ embeds: [userUpdateEmbed] })
				.catch((err) => console.log(err));
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
			logsChannel
				.send({ embeds: [userUpdateEmbed] })
				.catch((err) => console.log(err));
		}

		if (oldUser.banner !== newUser.banner) {
			// If banner changed execute code
			userUpdateEmbed
				.setDescription(`The user ${newUser} changed their banner`)
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
			logsChannel
				.send({ embeds: [userUpdateEmbed] })
				.catch((err) => console.log(err));
		}

		if (oldUser.avatar !== newUser.avatar) {
			// If avatar changed execute code
			userUpdateEmbed
				.setDescription(`The user ${newUser} changed their avatar`)
				.setImage(newUser.avatarURL({ dynamic: true }))
				.addFields(
					{
						name: "Old avatar",
						value: oldUser.avatar
							? `${oldUser.avatarURL({ dynamic: true })}`
							: "No avatar before",
					},
					{
						name: "New avatar",
						value: newUser.avatar
							? `${newUser.avatarURL({ dynamic: true })}`
							: "No new avatar",
					}
				);
			logsChannel
				.send({ embeds: [userUpdateEmbed] })
				.catch((err) => console.log(err));
		}

		if (!oldUser.flags || !newUser.flags) return;
		if (oldUser.flags != newUser.flags) {
			// If flags changed execute code
			const newFlags = new UserFlags(
				oldUser.flags.missing(newUser.flags.bitfield, false)
			).toArray();
			const oldFlags = new UserFlags(
				newUser.flags.missing(oldUser.flags.bitfield, false)
			).toArray();

			if (newFlags.length < 1 && oldFlags.length < 1) return;
			userUpdateEmbed.setDescription(`The user ${newUser} changed their flags`);

			if (newFlags.length > 0) {
				const addedPerms = d
					.slice(" ")
					.map((e) => `\`${e}\``)
					.join(" ")
					.toLowerCase()
					.replaceAll("_", " ");
				userUpdateEmbed.addField("**Added Flags**", addedPerms);

				logsChannel
					.send({ embeds: [userUpdateEmbed] })
					.catch((err) => console.log(err));
			}

			if (oldFlags.length > 0) {
				const removedPerms = s
					.slice(" ")
					.map((e) => `\`${e}\``)
					.join(" ")
					.toLowerCase()
					.replaceAll("_", " ");
				userUpdateEmbed.addField("**Removed Flags**", removedPerms);

				logsChannel
					.send({ embeds: [userUpdateEmbed] })
					.catch((err) => console.log(err));
			}
		}
	},
};
