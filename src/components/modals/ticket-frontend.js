const { EmbedBuilder, Embed, ChannelType, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: {
        name: 'ticket-frontend'
    },
    async execute(interaction, client){
        let text = interaction.fields.getTextInputValue("text");
        let payment = interaction.fields.getTextInputValue("payment");

        const emb = new EmbedBuilder()
            .setTitle(`Ticket`)
            .setDescription(`${interaction.user} FRONTEND Ticket created
                **What type of frontend**
                ${text}
                **Payment method?**
                ${payment}
            `)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())

        const button = new ButtonBuilder()
            .setCustomId("close-ticket")
            .setLabel('Close')
            .setStyle(ButtonStyle.Danger)

        const feedback = new ButtonBuilder()
            .setCustomId("stay-feedback")
            .setLabel('Leave feedback')
            .setStyle(ButtonStyle.Success)
            .setEmoji('1038106770733793400')
        
        
        let source = await client.users.fetch('788532733576085554');

        await client.channels.fetch(client.channelsLists.ticketFrontend)
            .then( channel => {
                channel.guild.channels.create({
                    name: `frontend-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: client.channelsLists.ticketFrontend,
                }).then( async chnl => {
                    chnl.lockPermissions();

                    chnl.permissionOverwrites.set([
                        {
                            id: channel.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        }
                    ]);

                    await interaction.reply({
                        content: `Created -> ${chnl}`,
                        ephemeral: true
                    });

                    source.send({
                        content: `Открыт новый тикет -> ${chnl}`
                    })

                    chnl.send({
                        content: `${source}`,
                        embeds: [emb] ,
                        components: [ new ActionRowBuilder().addComponents(button).addComponents(feedback) ]
                    });
                })
            })
        
        client.infoData.totalTickets += 1;
        client.infoData.openTickets += 1;
        client.saveData();

        
    }
}