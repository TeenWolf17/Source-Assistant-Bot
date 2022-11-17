const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji, ButtonStyle, ButtonBuilder, ButtonComponent } = require('discord.js');
const fs = require('fs');

let statusLists = ["In processing", "In work", "Almost done", "Ready"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createorder")
        .addStringOption(option => option.setName("name").setDescription("Name of order ").setRequired(true))
        .addIntegerOption(option => option.setName("price").setDescription("Price of order ").setRequired(true).setMinValue(0))
        .addIntegerOption(option => option.setName("status").setDescription("Status of Order").setRequired(true).setMinValue(0).setMaxValue(3).addChoices({name: "In processing", value: 0}, {name: "In work", value: 1}, {name: "Almost done", value: 2}, {name: "Ready", value: 3}))

        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription("Create order"),
    async execute(interaction, client) {

        let name = interaction.options.getString('name');
        let price = interaction.options.getInteger('price');
        let status = interaction.options.getInteger('status');

        
        let ticketsInfo = fs.readFileSync('./data/tickets.json');
        
        ticketsInfo = JSON.parse(ticketsInfo);

        let ticketChannel = ticketsInfo.find( ticket => ticket.channel == interaction.channel);

        if( !ticketChannel ) return await interaction.reply({
            ephemeral: true,
            content: "It's not ticket!"
        })

        let user = await client.users.fetch(ticketChannel.creator);

        let orderId = makeid(16);

        const emb = new EmbedBuilder()
            .setTitle(`Order・${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`
                **Name:**
                > ${name}
                **Price**
                > $${price}
                **Status**
                > ${statusLists[status]}

                **Order ID**
                > ${orderId}
            `)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())
        
        
        let ordersInfo = await fs.readFileSync('./data/orders.json');
        ordersInfo = JSON.parse(ordersInfo);

        ordersInfo.push({
            id: orderId,
            ticketId: ticketChannel.ticketId,
            channel: ticketChannel.channel,
            name: name,
            price: price,
            status: status,
            creator: ticketChannel.creator,
            time: Date.now(),
            opened: true
        })


        await fs.writeFileSync('./data/orders.json', JSON.stringify(ordersInfo));

        await interaction.reply({
            embeds: [emb],
            content: `${user}`
        })

        
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}