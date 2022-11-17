const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji, ButtonStyle, ButtonBuilder, ButtonComponent } = require('discord.js');
const fs = require('fs');

let statusLists = ["In processing", "In work", "Almost done", "Ready"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .addStringOption(option => option.setName("orderid").setDescription("Order ID ").setRequired(true))
        .addIntegerOption(option => option.setName("status").setDescription("Status of Order").setRequired(true).setMinValue(0).setMaxValue(3).addChoices({name: "In processing", value: 0}, {name: "In work", value: 1}, {name: "Almost done", value: 2}, {name: "Ready", value: 3}))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription("Change Order Status"),
    async execute(interaction, client) {

        let orderid = interaction.options.getString('orderid');
        let status = interaction.options.getInteger('status');
        
        let ordersInfo = fs.readFileSync('./data/orders.json');
        ordersInfo = JSON.parse(ordersInfo);

        let order = ordersInfo.find( ord => ord.id == orderid);

        if( !order ) return await interaction.reply({
            ephemeral: true,
            content: "Order not found!"
        })

        if(!order.opened) return await interaction.reply({
            ephemeral: true,
            content: `Order is closed`
        })

        let user = await client.users.fetch(order.creator);

        const emb = new EmbedBuilder()
            .setTitle(`Order・Updated・${user.username}`)
            .setDescription(`
                **Order ID**
                > ${orderid}
                **New status**
                > ${statusLists[status]}
            `)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())
        
        ordersInfo.forEach( (i,k) => {
            if( i.id == orderid ) i.status = status;
        })

        await fs.writeFileSync('./data/orders.json', JSON.stringify(ordersInfo));

        await client.channels.fetch(order.channel).then( chnl => {
            chnl.send({
                embeds: [emb],
                content: `${user}`
            })
        })       


        await interaction.reply({
            ephemeral: true,
            content: `Updated`
        })

        
    }
}