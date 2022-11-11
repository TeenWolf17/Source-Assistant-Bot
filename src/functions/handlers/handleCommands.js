const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
 
const fs = require('fs'); 

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for(const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'))

            const { commands, commandArray } = client;

            for(const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON())
            }
        }

        const clientId = '1037156764275183718';
        const guildId = '948696971101732944';
        const rest = new REST({version: '9'}).setToken('MTAzNzE1Njc2NDI3NTE4MzcxOA.Ga0ygl.udc_lyxtAFmXv-XGtCqDtHtOAYIvwljOC5hX2Q');
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationGuildCommands(clientId, guildId),{
                body: client.commandArray
            })

            console.log('Succesfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}