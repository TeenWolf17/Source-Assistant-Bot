const { EmbedBuilder, Embed } = require('discord.js');


let stars = [
    "",
    ":star:",
    ":star::star:",
    ":star::star::star:",
    ":star::star::star::star:",
    ":star::star::star::star::star:",
]

module.exports = {
    data: {
        name: 'feedback'
    },
    async execute(interaction, client){
        let designer = parseInt(interaction.fields.getTextInputValue("designer"));
        let delivery = parseInt(interaction.fields.getTextInputValue("delivery"));
        let support = parseInt(interaction.fields.getTextInputValue("support"));
        let comment = interaction.fields.getTextInputValue("comment");

        if( designer == NaN || delivery == NaN || support == NaN ) {
            return;
        }

        client.infoData.ratings.push(designer);
        client.infoData.ratings.push(delivery);
        client.infoData.ratings.push(support);
        client.saveData()

        const emb = new EmbedBuilder()
            .setTitle(`${interaction.user.tag} 💠 Review`)
            .setFooter({text: interaction.user.tag})
            .setColor(0x7B68F7)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .addFields([
                {
                    name: "\n\nRate the work of the designer on a 5-point scale", 
                    value: stars[designer]
                },
                {
                    name: "Rate the quality and delivery time of the service", 
                    value: stars[delivery]
                },
                {
                    name: "Rate support work in progress", 
                    value: stars[support]
                },
                {
                    name: "Your comment about the work of Source Store", 
                    value: comment
                }
            ])

        
        await client.channels.fetch(client.channelsLists.Feedbacks).then( channel => {
            channel.send({
                embeds: [emb] 
            });
        })

        await interaction.reply({
            content: 'Done',
            ephemeral: true
        });


    }
}