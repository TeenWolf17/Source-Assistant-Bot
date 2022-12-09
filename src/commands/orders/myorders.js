const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji, ButtonStyle, ButtonBuilder, ButtonComponent } = require('discord.js');
const fs = require('fs');

let statusLists = ["In processing", "In work", "Almost done", "Ready"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("myorders")
        .setDescription("Get info about my orders"),
    async execute(interaction, client) {
        
        let ordersInfo = fs.readFileSync('./data/orders.json');
        ordersInfo = JSON.parse(ordersInfo);

        let emb = new ActionRowBuilder();

        ordersInfo.forEach( async order => {

            if( order.creator == interaction.user.id ) {
                let emb = new EmbedBuilder()
                    .setTitle(`Order・${interaction.user.username}`)
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setDescription(`
                        **Name:**
                        > ${order.name}
                        **Price**
                        > $${order.price}
                        **Status**
                        > ${statusLists[order.status]} | ${order.opened ? "Opened":"Closed"}

                        **Order ID**
                        > ${order.id}
                    `)
                    .setColor(0x7B68F7)
                    .setTimestamp(Date.now())
                
                await interaction.user.send( { 
                    embeds: [emb]
                })

            }
        } )

        
        

        await interaction.reply({
            ephemeral: true,
            content: `done`
        })

        
    }
}
