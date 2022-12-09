const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji, ButtonStyle, ButtonBuilder, ButtonComponent } = require('discord.js');
const fs = require('fs');

let statusLists = ["In processing", "In work", "Almost done", "Ready"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .addStringOption(option => option.setName("orderid").setDescription("Order ID ").setRequired(true))
        .setDescription("Get info about Order"),
    async execute(interaction, client) {

        let orderid = interaction.options.getString('orderid');
        
        let ordersInfo = fs.readFileSync('./data/orders.json');
        ordersInfo = JSON.parse(ordersInfo);

        let order = ordersInfo.find( ord => ord.id == orderid);

        if( !order ) return await interaction.reply({
            ephemeral: true,
            content: "Order not found!"
        })

        let user = await client.users.fetch(order.creator);

        const emb = new EmbedBuilder()
            .setTitle(`Order・${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`
                **Name:**
                > ${order.name}
                **Price**
                > $${order.price}
                **Status**
                > ${statusLists[order.status]} (Last update: ${new Date(order.lastupdate).toLocaleString()})

                **Order ID**
                > ${orderid}
            `)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())
        

        await interaction.reply({
            embeds: [emb],
            content: `${user}`
        })

        
    }
}
