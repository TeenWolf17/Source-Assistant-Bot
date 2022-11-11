const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: "close-ticket"
    },
    async execute(interaction, client) {

        let row = new ActionRowBuilder()
            .addComponents( 
                new ButtonBuilder()
                .setCustomId("close-ticket-yes")
                .setLabel('Close ticket')
                .setStyle(ButtonStyle.Danger))
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("close-ticket-no")
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Secondary))
        
        await interaction.reply({
            content: `Are u sure u want to close the Ticket?`,
            components: [ row  ],
            ephemeral: true
        })
    }
}