const {ActivityType} = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`${client.user.tag} is Ready!`)
        client.user.setPresence({
            activities: [{ name: `Source Portfolio`, type: ActivityType.Watching }],
            status: 'online',
        });
    }
}