const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendmsg")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription("Send msg to order"),
    async execute(interaction, client) {
        const emb = new EmbedBuilder()
            .setTitle(`Ticket`)
            .setFooter({text: 'Source | Tickets'})
            .setColor(0x7B68F7)
            .setThumbnail('https://media.discordapp.net/attachments/972631423292952597/1011413903323967530/unknown.png')
            .setTimestamp(Date.now())
            .setDescription(`Chose your Categorie.\n
            🎟️ DESIGN- A purchase request for a design
            🎟️ VIDEO- A purchase request for a video
            🎟️ FRONTEND- A purchase request for a frontend
            `)
            .setImage('https://cdn.discordapp.com/attachments/972631423292952597/1011413883833045122/unknown.png')

        const selectMenu = new SelectMenuBuilder()
            .setCustomId('ticket-type')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Select the ticket category')
            .setOptions(new SelectMenuOptionBuilder(
                {
                    label: 'DESIGN',
                    emoji: {
                        name: '🎨',
                    },
                    value: 'design'
                }),
                new SelectMenuOptionBuilder({
                    label: 'VIDEO',
                    emoji: {
                        name: '🎥',
                    },
                    value: 'video'
                }),
                new SelectMenuOptionBuilder({
                    label: 'FRONTEND',
                    emoji: {
                        name: '⚙',
                    },
                    value: 'frontend'
                })
            );

        await client.channels.fetch(interaction.channel.id).then( channel => {
            channel.send({
                embeds: [emb],
                components: [new ActionRowBuilder().addComponents(selectMenu)]
            });
        })

    }
}