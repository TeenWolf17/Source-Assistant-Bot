const { EmbedBuilder, Embed, ChannelType, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

const ticket = require('../../any/ticket');

module.exports = {
    data: {
        name: 'ticket-design'
    },
    async execute(interaction, client){

        await ticket.execute(interaction, client, {
            text: interaction.fields.getTextInputValue("text"),
            text2: interaction.fields.getTextInputValue("payment"),
            type: 'design'
        })

    }
}