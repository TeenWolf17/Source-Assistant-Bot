const { EmbedBuilder, Embed, ChannelType, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

const ticket = require('../../any/ticket');

module.exports = {
    data: {
        name: 'ticket-support'
    },
    async execute(interaction, client){

        await ticket.execute(interaction, client, {
            text: interaction.fields.getTextInputValue("text"),
            text2: interaction.fields.getTextInputValue("text2"),
            text3: interaction.fields.getTextInputValue("text3"),
            type: 'support'
        })

    }
}