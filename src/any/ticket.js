const { EmbedBuilder, Embed, ChannelType, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

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
    "script": {
        type: 'SCRIPT',
        desc:  `
            **What type of script**
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
    "frontend": {
        type: 'BACKEND',
        desc:  `
            **What type of backend**
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
    },
    "support": {
        type: 'SUPPORT',
        desc:  `
            **Describe your problem:**
            > $$%text%$$
            **Your options for solving the problem:**
            > $$%text2%$$
            **Comment:**
            > $$%text3%$$
        `
    },
    "partnership": {
        type: 'PARTNERSHIP',
        desc:  `
            **Your discord server:**
            > $$%text%$$
            **How many members are in your channel:**
            > $$%text2%$$
            **Comment:**
            > $$%text3%$$
        `
    },
    "bot": {
        type: "BOT",
        desc:  `
            **Type of BOT:**
            > $$%text%$$
            **Payment:**
            > $$%text2%$$
        `
    }
}

module.exports = {
    async execute(interaction, client, {type, text, text2, text3}){

        if(!descLists[type]) return await interaction.reply({
            content: "Error 2!",
            ephemeral: true
        })

        let description = descLists[type].desc
            .replace("$$%text%$$", text)
            .replace("$$%text2%$$", text2)
            .replace("$$%text3%$$", text3)

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

        


        let channelID;

        switch(type) {
            case 'frontend':
                channelID = client.channelsLists.ticketFrontend;
                break;

            case 'script':
                channelID = client.channelsLists.ticketScript;
                break;
            
            case 'backend':
                channelID = client.channelsLists.ticketBackend;
                break;

            case 'support':
                channelID = client.channelsLists.ticketSupport;
                break;

            case 'partnership':
                channelID = client.channelsLists.ticketPartner;
                break;

            case 'design':
                channelID = client.channelsLists.ticketDesign;
                break;
        
            case 'video':
                channelID = client.channelsLists.ticketVideo;
                break;

            case 'bot':
                channelID = client.channelsLists.ticketBot;
                break;

            default:
                channelID = client.channelsLists.ticketVideo;
                break;
        } 
        
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

                    client.source.send({
                        content: `Открыт новый тикет -> ${chnl}`
                    })

                    let ticketsInfo = fs.readFileSync('./data/tickets.json');
                    ticketsInfo = JSON.parse(ticketsInfo);

                    chnl.send({
                        content: `${client.source}`,
                        embeds: [emb] ,
                        components: [ new ActionRowBuilder().addComponents(button) ]
                    }).then( ms => {
                        ticketsInfo.push({
                            ticketId: ticketsInfo.length + 1,
                            channel: chnl.id,
                            creator: interaction.user.id,
                            type: type,
                            msg: ms.id,
                            description: description,
                            orders: [],
                            time: Date.now()
                        })
    
    
                        fs.writeFileSync('./data/tickets.json', JSON.stringify(ticketsInfo));
                    });
                })
            })
        
        client.infoData.totalTickets += 1;
        client.infoData.openTickets += 1;
        client.saveData()
    }
}