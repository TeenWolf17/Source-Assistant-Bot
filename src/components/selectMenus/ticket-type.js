const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, SelectMenuOptionBuilder, SelectMenuComponent } = require('discord.js');

module.exports = {
    data: {
        name: 'ticket-type'
    },
    async execute(interaction, client){
        const modal = new ModalBuilder()
            .setCustomId(`ticket-${interaction.values[0]}`)
            .setTitle('Questionnaire');

        if(interaction.values[0] == 'design') {
            const temp = new TextInputBuilder()
                .setCustomId('text')
                .setLabel('What design do you want to buy')
                .setPlaceholder('HUD, Notify, ...')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setMinLength(2)
            
            modal.addComponents(new ActionRowBuilder().addComponents(temp))
        }

        if(interaction.values[0] == 'video') {
            const temp = new TextInputBuilder()
                .setCustomId('text')
                .setLabel('What type of video')
                .setPlaceholder('Carshow, Cinematic')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setMinLength(2)
            
            modal.addComponents(new ActionRowBuilder().addComponents(temp))
        }

        if(interaction.values[0] == 'frontend') {
            const temp = new TextInputBuilder()
                .setCustomId('text')
                .setLabel('What type of frontend')
                .setPlaceholder('Notify...')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setMinLength(2)
            
            modal.addComponents(new ActionRowBuilder().addComponents(temp))
        }

        const payment = new TextInputBuilder()
            .setCustomId('payment')
            .setLabel('Payment method?')
            .setPlaceholder('Bitcoin, Ethereum, PayPal')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMinLength(2)

        modal.addComponents(new ActionRowBuilder().addComponents(payment))

        await interaction.showModal(modal)

    }
}
/*

Questionnaire

Frontend:
    What type of frontend
    Notify...

Video:
    What type of video
    Carshow, Cinematic


Payment method?
Bitcoin, Ethereum, PayPal
    
*/