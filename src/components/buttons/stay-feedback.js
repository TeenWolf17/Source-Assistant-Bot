const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        name: "stay-feedback"
    },
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('feedback')
            .setTitle('Feedback');

        const designer = new TextInputBuilder()
            .setCustomId('designer')
            .setLabel('Rate the work of the designer on a 5-point')
            .setPlaceholder('[1-5]')
            .setValue('5')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1)
            .setMinLength(1)

        const delivery = new TextInputBuilder()
            .setCustomId('delivery')
            .setLabel('Rate the quality & delivery time of service')
            .setPlaceholder('[1-5]')
            .setValue('5')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1)
            .setMinLength(1)
        
        const support = new TextInputBuilder()
            .setCustomId('support')
            .setLabel('Rate support work in progress')
            .setPlaceholder('[1-5]')
            .setValue('5')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1)
            .setMinLength(1)

        const comment = new TextInputBuilder()
            .setCustomId('comment')
            .setLabel('Your comment about the work of Source Store')
            .setPlaceholder('Comment...')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(1000)
            .setMinLength(6)

        modal.addComponents(new ActionRowBuilder().addComponents(designer))
        modal.addComponents(new ActionRowBuilder().addComponents(delivery))
        modal.addComponents(new ActionRowBuilder().addComponents(support))
        modal.addComponents(new ActionRowBuilder().addComponents(comment))

        await interaction.showModal(modal)
    }
}