const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji, ButtonStyle, ButtonBuilder, ButtonComponent } = require('discord.js');
const fs = require('fs');

let statusLists = ["In processing", "In work", "Almost done", "Ready"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Get my stats"),
    async execute(interaction, client) {
        
        let ordersInfo = fs.readFileSync('./data/orders.json');
        ordersInfo = JSON.parse(ordersInfo);

        let emb = new EmbedBuilder()
            .setTitle(`Order・Stats・${interaction.user.username}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`
                **Active orders:**
                > ${ordersInfo.filter(order => order.creator == interaction.user.id && order.opened).length}
                **Total orders:**
                > ${ordersInfo.filter(order => order.creator == interaction.user.id).length}
            `)
            .setColor(0x7B68F7)
            .setTimestamp(Date.now())
        

        await interaction.reply({
            embeds: [emb]
        })

        
    }
}
