const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, Embed, PermissionsBitField, SelectMenuBuilder, SelectMenuOptionBuilder, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MANAGE_CHANNELS)
        .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))
        .setDescription("Add user to ticket"),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
        interaction.channel.permissionOverwrites.create(target, { ViewChannel: true });

        const emb = new EmbedBuilder()
            .setTitle("Ticket")
            .setDescription(`${interaction.user} Added to ticket ${target}`)

        await interaction.reply({
            embeds: [emb]
        })
    }
}