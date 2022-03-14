// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Commands/Utilities/afk.js
// Git           - https://github.com/1dxy/DiscordBot
// Author        - 1dxy [1dxyofficial.com]
// Start On      - Monday 14 March 2022, 5:09pm (EST)
// Modified On   - Monday 14 March 2022, 5:13:14 pm (EST)
// -------------------------------------------------------------------------

const { CommandInteraction, Client, MessageEmbed, Message } = require("discord.js");
const afkSchema = require("../../Structures/Schemas/afkDB")

module.exports = {
	name: "afk",
	path: "Utilities/afk.js",
	description: "Set yourself afk!",
    options: [
        {
            name: 'reason',
            description: 'Reasoning why you went afk',
            type: "STRING",
            required: false
        },
    ],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
     * @param {Message} message
	 */
	async execute(interaction, client) {
		const reason = interaction.options.getString('reason') || "Unspecified"

        const params = {
            Guild: interaction.guild.id,
            User: interaction.guild.id
        }

        afkSchema.findOne({params}, async(err, data) => {
            if (err)
            throw err;
            if (data) {
                data.delete()
                interaction.reply({content: `You are no longer AFK!`, ephemeral: true})
            } else {
                new afkSchema({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Reason: reason,
                    Date: Date.now()
                }).save();
                interaction.reply({content: `You are now AFK for the reasoning of \`${reason}\``, ephemeral: true})
            }
        })
	},
};
