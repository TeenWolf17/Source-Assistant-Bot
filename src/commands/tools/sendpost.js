const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendpost")
        .addStringOption(option => option.setName("title").setDescription("Set Post Title").setRequired(true))
        .addStringOption(option => option.setName('image').setDescription("Set Post Image"))
        .addStringOption(option => option.setName('description').setDescription("Set Post Description"))
        .setDescription("Send Post To Chanel"),
    async execute(interaction, client) {
        
        let title = interaction.options.getString('title');
        let image = interaction.options.getString('image');
        let description = interaction.options.getString('description');

        const emb = new EmbedBuilder()
                .setColor(0x7B68F7)
                .setAuthor({
                    name: `${title}`
                })
                .setDescription(`${description}`)
                .setTimestamp()
                .setFooter({
                    text: `Source Store`
                })

        if(image)
            emb.setImage(image)

        
        interaction.channel.send({
            embeds: [emb]
        })
    }
}