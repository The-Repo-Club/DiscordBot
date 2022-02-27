const moment = require("moment");
const { CommandInteraction, MessageEmbed } = require("discord.js");

const filterLevels = {
	DISABLED: "Off",
	MEMBER_WITHOUT_ROLES: "No Role",
	ALL_MEMBERS: "Everyone",
};

const verificationLevels = {
	NONE: "None",
	LOW: "Low",
	MEDIUM: "Medium",
	HIGH: "High",
	VERY_HIGH: "Very High",
};

module.exports = {
	name: "serverinfo",
	description: "Sends the server's information",

	/**
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		// const { guild } = interaction;
		// const roles = guild.roles.cache
		// 	.sort((a, b) => b.position - a.position)
		// 	.map((role) => role.toString())
		// 	.slice(0, -1);
		// let rolesdisplay;
		// if (roles.length < 20) {
		// 	rolesdisplay = roles.join(" ");
		// 	if (roles.length < 1) rolesdisplay = "None";
		// } else {
		// 	rolesdisplay = `${roles.slice(20).join(" ")} \`and more...\``;
		// }
		// const members = guild.members.cache;
		// const channels = guild.channels.cache;
		// const emojis = guild.emojis.cache;
		// const owner = client.users.cache.get(guild.ownerId);
		// const serverEmbed = new MessageEmbed()
		// 	.setColor("#2f3136")
		// 	.setTitle(`Server Information for ${guild.name}`)
		// 	.setThumbnail(guild.iconURL({ dynamic: true }))
		// 	.addField(
		// 		"__General__",
		// 		`**❯ Name:** \`${guild.name}\`
		//   **❯ ID:** \`${guild.id}\`
		//   **❯ Owner:** <@!${guild.ownerId}> \`(${guild.ownerId})\`
		//   **❯ Boost Tier:** \`${
		// 		guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"
		// 	}\`
		//   **❯ Explicit Filter:** \`${filterLevels[guild.explicitContentFilter]}\`
		//   **❯ Verification Level:** \`${
		// 		verificationLevels[guild.verificationLevel]
		// 	}\`
		//   **❯ Time Created:** \`${moment(guild.createdTimestamp).format(
		// 		"LT"
		// 	)} ${moment(guild.createdTimestamp).format("LL")} ${moment(
		// 			guild.createdTimestamp
		// 		).fromNow()}\`\n\n`
		// 	)
		// 	.addField(
		// 		"__Statistics__",
		// 		`**❯ Role Count:** \`${roles.length}\`
		//   **❯ Emoji Count:** \`${emojis.size}\`
		//   **❯ Regular Emoji Count:** \`${
		// 		emojis.filter((emoji) => !emoji.animated).size
		// 	}\`
		//   **❯ Animated Emoji Count:** \`${
		// 		emojis.filter((emoji) => emoji.animated).size
		// 	}\`
		//   **❯ Member Count:** \`${guild.memberCount}\`
		//   **❯ Humans:** \`${members.filter((member) => !member.user.bot).size}\`
		//   **❯ Bots:** \`${members.filter((member) => member.user.bot).size}\`
		//   **❯ Text Channels:** \`${
		// 		channels.filter((channel) => channel.type === "GUILD_TEXT").size
		// 	}\`
		//   **❯ Voice Channels:** \`${
		// 		channels.filter((channel) => channel.type === "GUILD_VOICE").size
		// 	}\`
		//   **❯ Boost Count:**\`${guild.premiumSubscriptionCount || "0"}\`\n\n`
		// 	)
		// 	.addField(`Roles [${roles.length}]`, rolesdisplay)
		// 	.setTimestamp()
		// 	.setFooter({ text: "Server Stats by TheRepo.Club#3623" });
		// interaction.reply({ embeds: [serverEmbed], ephemeral: true });

		interaction.reply({ content: "This is a WIP", ephemeral: true });
	},
};
