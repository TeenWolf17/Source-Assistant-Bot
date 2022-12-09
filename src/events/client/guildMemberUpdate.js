const { InteractionType, EmbedBuilder, Embed, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember){
        if(!oldMember.premiumSince && newMember.premiumSince) {
            const emb = new EmbedBuilder()
                .setColor(0x7B68F7)
                .setAuthor({
                    name: `Source Store`
                })
                .setDescription(`
                    👋 **Welcome to Source Store Server**
                    ✉️  Hello ${newMember}. Good to see you here. I have gifts for you:
                    
                    \`1\` **You get a 5% discount** on your first order, place an order — <#962675127894564914>
                    \`2\` **You can get UI for free** by giving 1 boost to this server — <#979357515617800192>
                `)
                .setTimestamp()
                .setFooter({
                    text: `Source Store`
                })
                .setThumbnail(newMember.displayAvatarURL())

            newMember.guild.channels.fetch('962652959785746492').then( channel => {
                channel.send({
                    content: `${newMember}`,
                    embeds: [emb]
                })
            })
        }
    }
}