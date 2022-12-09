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
    "script": [
        {
            id: "text",
            label: "What type of script",
            placeholder: "Inventory..."
        },
        {
            id: "payment",
            label: "Payment method?",
            placeholder: "Bitcoin, Ethereum, PayPal"
        }
    ],
    "backend": [
        {
            id: "text",
            label: "What type of backend",
            placeholder: "..."
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
    ],
    "bot": [
        {
            id: "text",
            label: "What type of bot",
            placeholder: "Giveaways, Economy ..."
        },
        {
            id: "payment",
            label: "Payment method?",
            placeholder: "Bitcoin, Ethereum, PayPal"
        }
    ],
    "support": [
        {
            id: "text",
            label: "Describe your problem:",
            placeholder: "..."
        },
        {
            id: "text2",
            label: "Your options for solving the problem:",
            placeholder: "..."
        },
        {
            id: "text3",
            label: "Comment: ",
            placeholder: "..."
        }
    ],
    "partnership": [
        {
            id: "text",
            label: "Your discord server:",
            placeholder: "..."
        },
        {
            id: "text2",
            label: "How many members are in your channel:",
            placeholder: "..."
        },
        {
            id: "text3",
            label: "Comment: ",
            placeholder: "..."
        }
    ]
}

module.exports = {
    data: {
        name: 'ticket-type'
    },
    async execute(interaction, client){

        let type = interaction.values[0];

        const modal = new ModalBuilder()
            .setCustomId(`ticket-${type}`)
            .setTitle('Ticket・Form');

        if( !inputBoxs[type] ) return await interaction.reply({
            content: "Error!",
            ephemeral: true
        });

        inputBoxs[type].forEach( box => {
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder()
                .setCustomId(box.id)
                .setLabel(box.label)
                .setPlaceholder(box.placeholder)
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setMinLength(2)
            ))
            
        })

        await interaction.showModal(modal)

    }
}