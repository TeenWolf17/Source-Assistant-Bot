const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dev")
        .setDescription("Send msg to order"),
    async execute(interaction, client) {

        const localemb = new EmbedBuilder()
            .setColor(0x7B68F7)
            .setAuthor({
                name: `Source Store`
            })
            .setDescription(`
                <:boost:1039178139282198599> **Thanks for boosting the Source Store server.** I have gifts for you:

                \`1\` A new channel has opened for you, **where you can get UI (Figma)** for free —  <#979357866693632010>
                \`2\` **You get a 5% discount** on your order, place an order — <#962675127894564914>
            `)
            .setTimestamp()
            .setFooter({
                text: `Source Store`
            })

        interaction.user.send({
            embeds: [localemb]
        })

        let source = await client.users.fetch('788532733576085554');
        source.send({
            content: `${interaction.user} теперь бустит сервер`
        })

        const emb = new EmbedBuilder()
            .setColor(0xFC6EF4)
            .setAuthor({
                name: `Source Store`
            })
            .setDescription(`**${interaction.user}** Boosted server`)
            .setTimestamp()
            .setFooter({
                text: `Source Store`
            })
            .setThumbnail(interaction.user.displayAvatarURL())

        interaction.guild.channels.fetch(client.channelsLists.welcome).then( channel => {
            channel.send({
                embeds: [emb]
            })
        })
    }
}