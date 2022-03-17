/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   giveaway.js
 *Author :
 *   1dxy [1dxy@revonodes.xyz]
 *Github :
 *   https://github.com/The-Repo-Club/DiscordBot
 *
 *Created:
 *   March 16, 2022, 9:17:50 PM EDT
 *Last edited:
 *   Thu 17 March 2022, 05:37:52 PM [GMT]
 *
 *Description:
 *   Giveaway Command
 *
 *Dependencies:
 *   ms, discord.js
 **/
 const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
 const { red, green, cyan } = require("../../Structures/colors.json");
 const ms = require("ms");
 
 module.exports = {
     name: "giveaway",
     description: "A complete giveaway system",
     permission: "ADMINISTRATOR",
     path: "Giveaway/giveaway.js",
     options: [
         {
             name: "start",
             description: "Start a giveaway",
             type: "SUB_COMMAND",
             options: [
                 {
                     name: "duration",
                     description: "Provide a duration for this giveaway (1m, 1h, 1d)",
                     type: "STRING",
                     required: true,
                 },
                 {
                     name: "winners",
                     description: "Select the amount of winners for this giveaway.",
                     type: "INTEGER",
                     required: true,
                 },
                 {
                     name: "prize",
                     description: "Provide the name of the prize.",
                     type: "STRING",
                     required: true,
                 },
                 {
                     name: "channel",
                     description: "Select a channel to send the giveaway to.",
                     type: "CHANNEL",
                     channelTypes: ["GUILD_TEXT"],
                 },
             ],
         },
         {
             name: "actions",
             description: "Options for giveaway",
             type: "SUB_COMMAND",
             options: [
                 {
                     name: "options",
                     description: "Select an option",
                     type: "STRING",
                     required: true,
                     choices: [
                         {
                             name: "end",
                             value: "end",
                         },
                         {
                             name: "pause",
                             value: "pause",
                         },
                         {
                             name: "unpause",
                             value: "unpause",
                         },
                         {
                             name: "reroll",
                             value: "reroll",
                         },
                         {
                             name: "delete",
                             value: "delete",
                         },
                     ],
                 },
                 {
                     name: "message-id",
                     description: "Provide the message id of the giveaway",
                     type: "STRING",
                     required: true,
                 },
             ],
         },
     ],
     /**
      *
      * @param {CommandInteraction} interaction
      * @param {Client} client
      */
     execute(interaction, client) {
         const { options } = interaction;
 
         const Sub = options.getSubcommand();
 
         const errorEmbed = new MessageEmbed().setColor(red);
 
         const successEmbed = new MessageEmbed().setColor(green);
 
         switch (Sub) {
             case "start":
                 {
                     const gchannel = options.getChannel("channel") || interaction.channel;
                     const duration = options.getString("duration");
                     const winnerCount = options.getInteger("winners");
                     const prize = options.getString("prize");
 
                     client.giveawaysManager
                         .start(gchannel, {
                             duration: ms(duration),
                             winnerCount,
                             prize,
                             messages: {
                                 giveaway: "🎉 **GIVEAWAY STARTED** 🎉",
                                 giveawayEnded: "🎊 **GIVEAWAY ENDED** 🎊",
                                 winMessage:
                                     "Congratulations, {winners}! You won **{this.prize}**!",
                             },
                         })
                         .then(async () => {
                             successEmbed.setDescription(
                                 "✅ Giveaway was sucessfully started."
                             );
                             return interaction.reply({
                                 embeds: [successEmbed],
                                 ephemeral: true,
                             });
                         })
                         .catch((err) => {
                             errorEmbed.setDescription(
                                 "❌ There was an error starting the giveaway."
                             );
                             return interaction.reply({
                                 embeds: [errorEmbed],
                                 ephemeral: true,
                             });
                         });
                 }
                 break;
 
             case "actions":
                 {
                     const choice = options.getString("options");
                     const messageId = options.getString("message-id");
 
                     const giveaway = client.giveawaysManager.giveaways.find(
                         (g) =>
                             g.guildId === interaction.guildId && g.messageId === messageId
                     );
 
                     if (!giveaway) {
                         errorEmbed.setDescription(
                             "❌ Unable to find the giveaway with the message id provided."
                         );
                         return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                     }
 
                     switch (choice) {
                         case "end":
                             {
                                 client.giveawaysManager
                                     .end(messageId)
                                     .then(() => {
                                         successEmbed.setDescription("✅ Giveaway has been ended.");
                                         return interaction.reply({
                                             embeds: [successEmbed],
                                             ephemeral: true,
                                         });
                                     })
                                     .catch((err) => {
                                         errorEmbed.setDescription("❌ Unable to end giveaway.");
                                         return interaction.reply({
                                             embeds: [errorEmbed],
                                             ephemeral: true,
                                         });
                                     });
                             }
                             break;
 
                         case "pause":
                             {
                                 client.giveawaysManager
                                     .pause(messageId)
                                     .then(() => {
                                         successEmbed.setDescription("✅ Giveaway has been pasued.");
                                         return interaction.reply({
                                             embeds: [successEmbed],
                                             ephemeral: true,
                                         });
                                     })
                                     .catch((err) => {
                                         errorEmbed.setDescription("❌ Unable to pause giveaway.");
                                         return interaction.reply({
                                             embeds: [errorEmbed],
                                             ephemeral: true,
                                         });
                                     });
                             }
                             break;
 
                         case "unpause":
                             {
                                 client.giveawaysManager
                                     .unpause(messageId)
                                     .then(() => {
                                         successEmbed.setDescription(
                                             "✅ Giveaway has been unpasued."
                                         );
                                         return interaction.reply({
                                             embeds: [successEmbed],
                                             ephemeral: true,
                                         });
                                     })
                                     .catch((err) => {
                                         errorEmbed.setDescription("❌ Unable to unpause giveaway.");
                                         return interaction.reply({
                                             embeds: [errorEmbed],
                                             ephemeral: true,
                                         });
                                     });
                             }
                             break;
 
                         case "reroll":
                             {
                                 client.giveawaysManager
                                     .reroll(messageId)
                                     .then(() => {
                                         successEmbed.setDescription(
                                             "✅ Giveaway has been rerplled."
                                         );
                                         return interaction.reply({
                                             embeds: [successEmbed],
                                             ephemeral: true,
                                         });
                                     })
                                     .catch((err) => {
                                         errorEmbed.setDescription("❌ Unable to reroll giveaway.");
                                         return interaction.reply({
                                             embeds: [errorEmbed],
                                             ephemeral: true,
                                         });
                                     });
                             }
                             break;
 
                         case "delete":
                             {
                                 client.giveawaysManager
                                     .delete(messageId)
                                     .then(() => {
                                         successEmbed.setDescription(
                                             "✅ Giveaway has been deleted."
                                         );
                                         return interaction.reply({
                                             embeds: [successEmbed],
                                             ephemeral: true,
                                         });
                                     })
                                     .catch((err) => {
                                         errorEmbed.setDescription("❌ Unable to delete giveaway.");
                                         return interaction.reply({
                                             embeds: [errorEmbed],
                                             ephemeral: true,
                                         });
                                     });
                             }
                             break;
                     }
                 }
                 break;
 
             default: {
                 console.log("Error in giveaway command.");
             }
         }
     },
 };
 