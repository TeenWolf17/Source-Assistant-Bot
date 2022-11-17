const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, SelectMenuOptionBuilder, SelectMenuComponent } = require('discord.js');

let inputBoxs = {
    "design": [
        {
            id: "text",
            label: "What design do you want to buy",
            placeholder: "HUD, Notify, ..."
        },
        {
            id: "payment",
            label: "Payment method?",
            placeholder: "Bitcoin, Ethereum, PayPal"
        }
],
    "frontend": [
        {
            id: "text",
            label: "What type of frontend",
            placeholder: "Notify..."
        },
        {
            id: "payment",
            label: "Payment method?",
            placeholder: "Bitcoin, Ethereum, PayPal"
        }
    ],
    "video": [
        {
            id: "text",
            label: "What type of video",
            placeholder: "Carshow, Cinematic"
        },
        {
            id: "payment",
            label: "Payment method?",
            placeholder: "Bitcoin, Ethereum, PayPal"
        }
    ]
}

module.exports = {
    data: {
        name: 'ticket-type'
    },
    async execute(interaction, client){
        const modal = new ModalBuilder()
            .setCustomId(`ticket-${interaction.values[0]}`)
            .setTitle('Questionnaire');

        if(interaction.values[0] == 'frontend') {
            const temp = new TextInputBuilder()
                .setCustomId('text')
                .setLabel('')
                .setPlaceholder('')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setMinLength(2)
            
            modal.addComponents(new ActionRowBuilder().addComponents(temp))
        }

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