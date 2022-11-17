const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField} = require('discord.js');

module.exports = {
    data: {
        name: "close-ticket-yes"
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `Ticket closed by ${interaction.user}`,
        })
        
        interaction.channel.permissionOverwrites.set([
            {
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel],
            }
        ]);
        interaction.channel.edit({parent: client.channelsLists.archive})
        // client.infoData.openTickets -= 1;
        client.saveData();
        
    }
}