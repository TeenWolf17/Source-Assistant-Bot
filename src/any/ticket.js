const { EmbedBuilder, Embed, ChannelType, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

let descLists = {
    "video": {
        type: 'VIDEO',
        desc: `
            **What type of video**
            > $$%text%$$
            **Payment method?**
            > $$%text2%$$
        `
    },
    "frontend": {
        type: 'FRONTEND',
        desc:  `
            **What type of frontend**
            > $$%text%$$
            **Payment method?**
            > $$%text2%$$
        `
    },
    "design": {
        type: 'DESIGN',
        desc: `
            **What design do you want do buy**
            > $$%text%$$
            **Payment method?**
            > $$%text2%$$
        `
    }
}

module.exports = {
    async execute(interaction, client, {type, text, text2}){

        let description = descLists[type].desc
            .replace("$$%text%$$", text)
            .replace("$$%text2%$$", text2)

        const emb = new EmbedBuilder()
            .setTitle(`Ticket・${descLists[type].type}・${interaction.user.username}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(description)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())

        const button = new ButtonBuilder()
            .setCustomId("close-ticket")
            .setLabel('Close')
            .setStyle(ButtonStyle.Danger)

        // const feedback = new ButtonBuilder()
        //     .setCustomId("stay-feedback")
        //     .setLabel('Leave feedback')
        //     .setStyle(ButtonStyle.Success)
        //     .setEmoji('1038106770733793400')


        let channelID;

        switch(type) {
            case 'frontend':
                channelID = client.channelsLists.ticketFrontend;
                break;
                
            case 'design':
                channelID = client.channelsLists.ticketDesign;
                break;

            default:
                channelID = client.channelsLists.ticketVideo;
                break;
        } 
        
            
        
        
        let source = await client.users.fetch('788532733576085554');

        await client.channels.fetch(channelID)
            .then( channel => {
                channel.guild.channels.create({
                    name: `${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: channel.id,
                }).then(async chnl => {

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
                        components: [ new ActionRowBuilder().addComponents(button) ]
                    });
                })
            })
        
        // client.infoData.totalTickets += 1;
        // client.infoData.openTickets += 1;
        // client.saveData()
    }
}