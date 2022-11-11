const { InteractionType, EmbedBuilder, Embed, ActionRowBuilder } = require('discord.js');

let requiredRoles = [
    "1037156764275183718"
]

module.exports = {
    name: 'guildMemberAdd',
    async execute(interaction, client){
        if(interaction.user.bot) return;

        requiredRoles.forEach(id => {
            let role = interaction.guild.roles.cache.find(role => role.id === id);
            if (role) interaction.user.roles.add(role);
        })

        const emb = new EmbedBuilder()
            .setColor(0x7B68F7)
            .setAuthor({
                name: `Source Store`
            })
            .setDescription(`
                👋 **Welcome to Source Store Server**
                ✉️  Hello ${interaction.user}. Good to see you here. I have gifts for you:

                \`1\` **You get a 5% discount** on your first order, place an order — <#962675127894564914>
                \`2\` **You can get UI for free** by giving 1 boost to this server — <#979357515617800192>
            `)
            .setTimestamp()
            .setFooter({
                text: `Source Store`
            })
            .setThumbnail(interaction.user.displayAvatarURL())

        interaction.guild.channels.fetch(client.channelsLists.welcome).then( channel => {
            channel.send({
                content: `${interaction.user}`,
                embeds: [emb]
            })
        })
    }
}