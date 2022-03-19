/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/Channel/channelUpdate.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Sat 19 March 2022, 11:17:19 AM [GMT]
 *Last edited:
 *   Sat 19 March 2022, 11:32:19 AM [GMT]
 *
 *Description:
 *   channelCreate Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, channelsDB, colors.json
 **/

const { MessageEmbed, Channel, Permissions } = require("discord.js");
const { red, green, orange } = require("../../../Structures/colors.json");
const ms = require("ms");
const DB = require("../../../Structures/Schemas/channelsDB");

module.exports = {
	name: "channelUpdate",
	path: "Channel/channelUpdate.js",
	/**
	 * @param {Channel} oldChannel
	 * @param {Channel} newChannel
	 */
	async execute(oldChannel, newChannel) {
		const Data = await DB.findOne({
			GuildID: oldChannel.guild.id,
		});
		if (!Data || !Data.logs.channelLogs) return;

		if (oldChannel.type == "DM" || oldChannel.type == "GROUP_DM") return;

		const logsChannel = oldChannel.guild.channels.cache.get(Data.logs.channelLogs);

		const logs = await oldChannel.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the audit logs and takes the last entry

		if (log.action == "CHANNEL_OVERWRITE_CREATE") {
			// If the last entry fetched is of the type "CHANNEL_OVERWRITE_CREATE" executes code

			const channelPermissionCreate = new MessageEmbed().setColor(green).setTitle(`<:icons_createchannel:952952678172991578> A Permission Has Been Created In A Channel`).setTimestamp().setFooter({ text: oldChannel.guild.name });

			if (log.extra.user) {
				// If target is a member executes code below
				channelPermissionCreate.setDescription(`> Permissions have been added in the channel ${oldChannel} by \`${log.executor.tag}\``)().addField("Member", `\`${log.extra.user.tag}\``);
			} else {
				// Else it means the target is a role
				channelPermissionCreate.setDescription(`> Permissions have been added in the channel ${oldChannel} by \`${log.executor.tag}\``).addField("Role", `\`${log.extra.name}\``);
			}

			if (log.changes.find((x) => x.key == "allow").new !== "0") {
				// If bitfield of allowed permissions is different than 0 (null) maps all the allowed permissions
				const p = new Permissions(log.changes.find((x) => x.key == "allow").new).toArray().join(" | ").toLowerCase().replaceAll("_", " ");
				channelPermissionCreate.addField("Allowed permissions", p);
			}
			if (log.changes.find((x) => x.key == "deny").new !== "0") {
				// If bitfield of denied permissions is different than 0 (null) maps all the denied permissions
				const p = new Permissions(log.changes.find((x) => x.key == "deny").new).toArray().join(" | ").toLowerCase().replaceAll("_", " ");
				channelPermissionCreate.addField("Denied permissions", p);
			}

			await logsChannel.send({ embeds: [channelPermissionCreate] }).catch((err) => console.log(err));
		} else if (log.action == "CHANNEL_OVERWRITE_UPDATE") {
			// If the last entry fetched is of the type "CHANNEL_OVERWRITE_UPDATE" executes code

			const channelPermissionUpdate = new MessageEmbed().setColor(orange).setTitle(`<:icons_updatechannel:954702705358688336> A Permission Has Been Updated In A Channel`).setTimestamp().setFooter({ text: oldChannel.guild.name });

			if (!log.changes.find((x) => x.key == "allow") && !log.changes.find((x) => x.key == "deny") && log.changes.find((x) => x.key == "allow").new == "0" && log.changes.find((x) => x.key == "deny").new == "0") return; // If there is no active change in the audit-logs return

			if (log.extra.user) {
				// If target is a member executes code below
				channelPermissionUpdate.setDescription(`> Permissions have been changed in the channel ${oldChannel} by \`${log.executor.tag}\``).addField("Member", `\`${log.extra.user.tag}\``);
			} else {
				// Else it means the target is a role
				channelPermissionUpdate.setDescription(`> Permissions have been changed in the channel ${oldChannel} by \`${log.executor.tag}\``).addField("Role", `\`${log.extra.name}\``);
			}

			if (log.changes.find((x) => x.key == "allow")) {
				if (log.changes.find((x) => x.key == "allow").new && log.changes.find((x) => x.key == "allow").new != "0") {
					// If bitfield of allowed permissions is different than 0 (null) maps all the allowed permissions
					const p = new Permissions(log.changes.find((x) => x.key == "allow").new).toArray().join(" | ").toLowerCase().replaceAll("_", " ");
					channelPermissionUpdate.addField("Allowed permissions", p);
				}
			}

			if (log.changes.find((x) => x.key == "deny")) {
				if (log.changes.find((x) => x.key == "deny").new && log.changes.find((x) => x.key == "deny").new != "0") {
					// If bitfield of denied permissions is different than 0 (null) maps all the denied permissions
					const p = new Permissions(log.changes.find((x) => x.key == "deny").new).toArray().join(" | ").toLowerCase().replaceAll("_", " ");
					channelPermissionUpdate.addField("Denied permissions", p);
				}
			}

			await logsChannel.send({ embeds: [channelPermissionUpdate] }).catch((err) => console.log(err));
		} else if (log.action == "CHANNEL_OVERWRITE_DELETE") {
			// If the last entry fetched is of the type "CHANNEL_OVERWRITE_DELETE" executes code

			const channelPermissionDelete = new MessageEmbed().setColor(red).setTitle(`<:icons_deletechannel:952954846665928774> A Permission Has Been Deleted In A Channel`).setTimestamp().setFooter({ text: oldChannel.guild.name });

			if (log.extra.user) {
				// If target is a member executes code below
				channelPermissionDelete.setDescription(`> Permissions have been deleted in the channel ${oldChannel} by \`${log.executor.tag}\``).addField("Member", `\`${log.extra.user.tag}\``);
			} else {
				// Else it means the target is a role
				channelPermissionDelete.setDescription(`> Permissions have been deleted in the channel ${oldChannel} by \`${log.executor.tag}\``).addField("Role", `\`${log.extra.name}\``);
			}

			await logsChannel.send({ embeds: [channelPermissionDelete] }).catch((err) => console.log(err));
		} else if (log.action == "CHANNEL_UPDATE") {
			// If the last entry fetched is of the type "CHANNEL_UPDATE" executes code

			const channelUpdateLogEmbed = new MessageEmbed().setColor(orange).setTitle(`<:icons_updatechannel:954702705358688336> A Channel Has Been Updated`).setTimestamp().setFooter({ text: oldChannel.guild.name });

			if (oldChannel.name !== newChannel.name) {
				// If named has changed execute code
				channelUpdateLogEmbed.setDescription(`> The name of ${newChannel} has been changed by \`${log.executor.tag}\``).addFields(
					{
						name: "Old name",
						value: `\`${oldChannel.name}\``,
					},
					{
						name: "New name",
						value: `\`${newChannel.name}\``,
					}
				);

				await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
			}

			if (oldChannel.type == "GUILD_VOICE" || oldChannel.type == "GUILD_STAGE_VOICE") {
				// If chanel is of a voice type execute code
				if (oldChannel.bitrate !== newChannel.bitrate) {
					// If bitrate changed execute code
					channelUpdateLogEmbed.setDescription(`> The channel ${newChannel}'s bitrate has been changed by \`${log.executor.tag}\``).addFields(
						{
							name: "Old bitrate",
							value: `${oldChannel.bitrate} bps`,
							inline: true,
						},
						{
							name: "New bitrate",
							value: `${newChannel.bitrate} bps`,
							inline: true,
						}
					);
				}
				await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
			}

			if (oldChannel.type == "GUILD_TEXT" || oldChannel.type == "GUILD_NEWS") {
				// If channel is of text type execute code
				if (!oldChannel.nsfw && newChannel.nsfw) {
					// If old channel isnt NSFW and new channel is it means the channel has been set to nsfw
					channelUpdateLogEmbed.setDescription(`> The channel ${newChannel} has been set nsfw by \`${log.executor.tag}\``);
					await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
				} else if (oldChannel.nsfw && !newChannel.nsfw) {
					// If old channel is NSFW and new channel isnt it means the channel has been removed from nsfw
					channelUpdateLogEmbed.setDescription(`> The channel ${newChannel} has been removed from nsfw by \`${log.executor.tag}\``);
					await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
				}

				if (oldChannel.topic !== newChannel.topic) {
					// If topic changed execute code
					channelUpdateLogEmbed.setDescription(`> The topic of ${newChannel} has been changed by ${log.executor.tag}`).addFields(
						{
							name: "Old topic",
							value: oldChannel.topic ? `\`${oldChannel.topic}\`` : "No topic before",
						},
						{
							name: "New topic",
							value: newChannel.topic ? `\`${newChannel.topic}\`` : "No new topic",
						}
					);

					await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
				}

				if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
					// If cooldown changed execute code
					channelUpdateLogEmbed.setDescription(`> The cooldown of ${oldChannel} has been updated by \`${log.executor.tag}\``).addFields(
						{
							name: "Old cooldown",
							value: `\`${ms(oldChannel.rateLimitPerUser * 1000)}\``,
							inline: true,
						},
						{
							name: "New cooldown",
							value: `\`${ms(newChannel.rateLimitPerUser * 1000)}\``,
							inline: true,
						}
					);

					await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
				}

				if (oldChannel.defaultAutoArchiveDuration !== newChannel.defaultAutoArchiveDuration) {
					// If default time to archive thread changed execute code
					channelUpdateLogEmbed.setDescription(`> The thread auto-archive of ${oldChannel} has been updated by \`${log.executor.tag}\``).addFields(
						{
							name: "Old thread auto-archive",
							value: `\`${ms(oldChannel.defaultAutoArchiveDuration * 60000)}\``,
							inline: true,
						},
						{
							name: "New thread auto-archive",
							value: `\`${ms(newChannel.defaultAutoArchiveDuration * 60000)}\``,
							inline: true,
						}
					);

					await logsChannel.send({ embeds: [channelUpdateLogEmbed] }).catch((err) => console.log(err));
				}
			}
		} else {
			// Else if the last entry wasnt one above it means the change wasnt audit-logged
			const channelUpdateEmbed = new MessageEmbed().setColor(orange).setTitle(`<:icons_updatechannel:954702705358688336> A Channel Has Been Updated`);

			if (oldChannel.parentId !== newChannel.parentId && oldChannel.type !== "GUILD_CATEGORY") {
				// If category has changed execute code
				channelUpdateEmbed.setDescription(`> The parent category of ${oldChannel} has been changed`).addFields(
					{
						name: "Old parent",
						value: oldChannel.parent ? `\`${oldChannel.parent.name}\`` : "No parent before",
					},
					{
						name: "New parent",
						value: newChannel.parent ? `\`${newChannel.parent.name}\`` : "No new parent",
					}
				);

				await logsChannel.send({ embeds: [channelUpdateEmbed] }).catch((err) => console.log(err));
			}
		}
	},
};
