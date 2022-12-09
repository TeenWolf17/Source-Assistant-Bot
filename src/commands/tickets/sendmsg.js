const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendmsg")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription("Send msg to order"),
    async execute(interaction, client) {
        const emb = new EmbedBuilder()
            .setTitle(`Ticket・Create`)
            .setDescription(`> Choose your Category`)
            .setFooter({text: 'Source | Tickets'})
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())
            .setImage('https://cdn.discordapp.com/attachments/972631423292952597/1011413883833045122/unknown.png')

        const selectMenu = new SelectMenuBuilder()
            .setCustomId('ticket-type')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Select the ticket category')
            .setOptions(
                new SelectMenuOptionBuilder({
                    label: 'BOT',
                    description: 'A purchase request for a Discord Bot',
                    emoji: {
                        name: '🤖',
                    },
                    value: 'bot'
                }),
                new SelectMenuOptionBuilder({
                    label: 'SCRIPT',
                    description: 'DESIGN + FRONTEND + BACKEND',
                    emoji: {
                        name: '📜',
                    },
                    value: 'script'
                }),
                new SelectMenuOptionBuilder(
                {
                    label: 'DESIGN',
                    description: 'A purchase request for a design',
                    emoji: {
                        name: '🎨',
                    },
                    value: 'design'
                }),
                new SelectMenuOptionBuilder({
                    label: 'FRONTEND',
                    description: 'A purchase request for a frontend',
                    emoji: {
                        name: '⚙',
                    },
                    value: 'frontend'
                }),
                new SelectMenuOptionBuilder({
                    label: 'BACKEND',
                    description: 'A purchase request for a backend',
                    emoji: {
                        name: '⚒',
                    },
                    value: 'backend'
                }),
                new SelectMenuOptionBuilder({
                    label: 'VIDEO',
                    description: 'A purchase request for a video',
                    emoji: {
                        name: '🎥',
                    },
                    value: 'video'
                }),
                new SelectMenuOptionBuilder({
                    label: 'SUPPORT',
                    description: 'We will give you the help we can',
                    emoji: {
                        name: '🔧',
                    },
                    value: 'support'
                }),
                new SelectMenuOptionBuilder({
                    label: 'PARTNERSHIP',
                    description: 'Consider options for cooperation with you',
                    emoji: {
                        name: '🧩',
                    },
                    value: 'partnership'
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