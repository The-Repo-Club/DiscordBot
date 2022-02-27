// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/status.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------

const {
	Client,
	CommandInteraction,
	MessageEmbed,
	MessageButton,
} = require("discord.js");
const paginationEmbed = require("../../Systems/paginationSys");
const { connection } = require("mongoose");
require("../../Events/Client/ready");
var os = require("os");
const ms = require("ms");

function getPBar(percent) {
	let thick = Math.floor(percent / 5);
	let thin = Math.ceil((100 - percent) / 10) * 2;
	let str = "";

	for (let i = 0; i < thick; i++) str += "▰";
	for (let i = 0; i < thin; i++) str += "▱";

	str += "";

	return str;
}

let usedMemory = os.totalmem() - os.freemem();
let totalMemory = os.totalmem();
let percentMemory = ((usedMemory / totalMemory) * 100).toFixed(0);

module.exports = {
	name: "status",
	description: "Displays the status of the client and database connection.",
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { guild } = interaction;
		const owner = client.users.cache.get(guild.ownerId);
		const Page1 = new MessageEmbed()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor("#8130D7")
			.setDescription(
				`**Client** [discord.js](https://discord.js.org/)
        <t:${parseInt(client.readyTimestamp / 1000)}:R> `
			)
			.setTimestamp()
			.addFields(
				{
					name: "Username",
					value: ` \` ${client.user.tag} \` `,
				},
				{
					name: "Ping",
					value: `\` 🟢 ONLINE ${client.ws.ping}ms \``,
				},
				{
					name: "Owner",
					value: `\` ${owner.tag} \``,
				}
			);

		const Page2 = new MessageEmbed()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor("#8130D7")
			.setDescription("**Stats**")
			.setTimestamp()
			.addFields(
				{
					name: "Commands",
					value: ` \` ${client.commands.size} commands \` `,
				},
				{
					name: "Guilds",
					value: `\` ${client.guilds.cache.size} guilds \``,
				},
				{
					name: "Users",
					value: `\` ${client.users.cache.size} users \``,
				}
			);

		const Page3 = new MessageEmbed()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor("#8130D7")
			.setDescription("**Database**")
			.setTimestamp()
			.addFields(
				{
					name: "Name",
					value: ` \` MongoDB \` `,
				},
				{
					name: "Status",
					value: `\` ${switchTo(connection.readyState)} \``,
				}
			);

		const Page4 = new MessageEmbed()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor("#8130D7")
			.setDescription("**Memory**")
			.setTimestamp()
			.addFields(
				{
					name: "Percentage",
					value: ` \` ${percentMemory}% \` `,
				},
				{
					name: "Bar",
					value: `\` ${getPBar(percentMemory)} \``,
				}
			);

		const btn1 = new MessageButton()
			.setStyle("DANGER")
			.setCustomId("previousbtn")
			.setLabel("Previous");

		const btn2 = new MessageButton()
			.setStyle("SUCCESS")
			.setCustomId("nextbtn")
			.setLabel("Next");

		const btn3 = new MessageButton()
			.setStyle("PRIMARY")
			.setCustomId("closebtn")
			.setLabel("Close");

		const embedList = [Page1, Page2, Page3, Page4];
		const buttonList = [btn1, btn2, btn3];
		const timeout = ms("10m");
		paginationEmbed(interaction, embedList, buttonList, timeout);
	},
};

function switchTo(val) {
	var status = " ";
	switch (val) {
		case 0:
			status = `🔴 Disconnected`;
			break;
		case 1:
			status = `🟢 Connected`;
			break;
		case 2:
			status = `🟠 Connecting`;
			break;
		case 3:
			status = `🟣 Disconnecting`;
			break;
	}
	return status;
}
