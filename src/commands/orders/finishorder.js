const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji, ButtonStyle, ButtonBuilder, ButtonComponent } = require('discord.js');
const fs = require('fs');

let statusLists = ["In processing", "In work", "Almost done", "Ready"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("finishorder")
        .addStringOption(option => option.setName("orderid").setDescription("Order ID ").setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription("Finish Order"),
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

        // TODO: Finished for 12days

        const emb = new EmbedBuilder()
            .setTitle(`Order・Finished・${user.username}`)
            .setDescription(`
                **Order ID**
                > ${orderid}
                **Status**
                > Finished
            `)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())

        const feedback = new ButtonBuilder()
            .setCustomId("stay-feedback")
            .setLabel('Leave feedback')
            .setStyle(ButtonStyle.Success)
            .setEmoji('1038106770733793400')

        await client.channels.fetch(order.channel).then( chnl => {
            chnl.send({
                embeds: [emb],
                content: `${user}`,
                components: [new ActionRowBuilder().addComponents(feedback)]
            }).then(async msgg => {
                let index = ordersInfo.findIndex( ord => ord.id == orderid )
                
                ordersInfo[index].opened = false;
                ordersInfo[index].endMsg = msgg.id;

                await fs.writeFileSync('./data/orders.json', JSON.stringify(ordersInfo));
            })
        })       



        await interaction.reply({
            ephemeral: true,
            content: `Updated`
        })

        
    }
}