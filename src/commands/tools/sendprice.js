const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendprice")
        .setDescription("Send Price To Channel"),
    async execute(interaction, client) {

        const emb = new EmbedBuilder()
            .setColor(0x7B68F7)
            .setAuthor({
                name: `Common Price`
            })
            .setDescription(`Here you can see the current prices for frequently ordered interfaces. The final cost may be different, it may depend on the complexity of the task. Create a ticket to clarify the price <#962675127894564914> There is a **5% discount on the first order.**`)
            .addFields(
                { name: "HUD", value: "$45", inline: true },
                { name: "HUD + Speedometer", value: "$75", inline: true },
                { name: "Dealership", value: "$55", inline: true },
                { name: "Garage", value: "$55", inline: true },
                { name: "Clothes Shop", value: "$55", inline: true },
                { name: "Market Shop (24/7)", value: "$55", inline: true },
                { name: "Inventory", value: "$55", inline: true },
                { name: "Gun Shop", value: "$55", inline: true },
                { name: "Loading Screen", value: "$55", inline: true },
                { name: "Salty NUI", value: "$55", inline: true },
                { name: "Character Creator", value: "$55", inline: true },
                { name: "Spawn Selector", value: "$45", inline: true },
                { name: "Registration", value: "$55", inline: true },
                { name: "Death Screen", value: "$45", inline: true },
                { name: "Tuning Garage", value: "$50", inline: true },

            )
            .setTimestamp()
            .setFooter({
                text: `Source Store`
            })
            .setImage('https://cdn.discordapp.com/attachments/999820404849913967/999830075484684399/123123213321.png')

        
        interaction.channel.send({
            embeds: [emb]
        })
    }
}