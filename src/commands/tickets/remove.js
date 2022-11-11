const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MANAGE_CHANNELS)
        .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))
        .setDescription("Remove user from ticket"),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
        interaction.channel.permissionOverwrites.create(target, { ViewChannel: false });

        const emb = new EmbedBuilder()
            .setTitle("Ticket")
            .setDescription(`${interaction.user} Removed from ticket ${target}`)

        await interaction.reply({
            embeds: [emb]
        })
    }
}