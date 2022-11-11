const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: "close-ticket-no"
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: 'Canceled closing Ticket!',
            ephemeral: true
        })
    }
}