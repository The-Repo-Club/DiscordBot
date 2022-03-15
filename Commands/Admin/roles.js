/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Admin/roles.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Tue 15 March 2022, 05:29:14 PM [GMT]
 *
 *Description:
 *   Roles Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ms, roleDB
 **/

const { MessageEmbed, CommandInteraction } = require("discord.js");
const DB = require("../../Structures/Schemas/roleDB"); //Make sure this path is correct
const ms = require("ms");

async function updateField(guild, field, role) {
	await DB.findOneAndUpdate(
		{ GuildID: guild },
		{
			[field]: role,
		},
		{
			new: true,
			upsert: true,
		}
	).catch((err) => console.log(err));
}

module.exports = {
	name: "roles",
	path: "Admin/roles.js",
	description: "Setup or reset the roles.",
	permission: "ADMINISTRATOR",
	options: [
		{
			name: "setup",
			description: "Setup the server roles.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "type",
					description: "Select the type of role you would like to setup.",
					required: true,
					type: "STRING",
					choices: [
						{
							name: "Bots",
							value: "Bots",
						},
						{
							name: "Partners",
							value: "Partners",
						},
						{
							name: "Premium",
							value: "Premium",
						},
						{
							name: "Supporters",
							value: "Supporters",
						},
						{
							name: "Welcome",
							value: "Welcome",
						},
					],
				},
				{
					name: "role",
					description: "Select the role to give to that type.",
					required: true,
					type: "ROLE",
				},
			],
		},
		{
			name: "reset",
			description: "Reset the roles.",
			type: "SUB_COMMAND",
		},
	],

	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		try {
			const options = interaction.options;
			const { guild } = interaction;

			switch (options.getSubcommand()) {
				case "setup":
					{
						const RType = options.getString("type");
						const RRole = options.getRole("role");

						const LogsSetup = new MessageEmbed()
							.setDescription(`✅ | Successfully setup the ${RType} role.`)
							.setColor("#43b581");

						updateField(guild.id, RType + "ID", RRole);

						await interaction.reply({
							embeds: [LogsSetup],
							ephemeral: true,
						});
					}
					break;
				case "reset":
					{
						const LogsReset = new MessageEmbed()
							.setDescription("✅ | Successfully reset the logging channels.")
							.setColor("#43b581");
						DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
							if (err) throw err;
							if (!data)
								return interaction.reply({
									content: "There is no data to delete",
								});
							return interaction
								.reply({ embeds: [LogsReset], fetchReply: true })
								.then((msg) => {
									setTimeout(() => msg.delete(), ms("5s"));
								});
						});
					}
					return;
			}
		} catch (error) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription(`❌ An error occurred. \n\n \`\`\`${error}\`\`\``),
				],
			});
		}
	},
};
