const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        if(interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if(!command) return new Error("There is not code for this command");

            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else if(interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);

            if(!button) return new Error("There is not code for this button");

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else if( interaction.type == InteractionType.ModalSubmit) {
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);

            if(!modal) return new Error("There is not code for this modal");

            try {
                await modal.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else if( interaction.isSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const selectMenu = selectMenus.get(customId);

            if(!selectMenu) return new Error("There is not code for this selectMenu");

            try {
                await selectMenu.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        }
    }
}