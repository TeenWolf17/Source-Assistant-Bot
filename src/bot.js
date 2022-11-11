require("dotenv").config();

// const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] })
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.infoData = {};
client.channelsLists = {
    welcome: '962652959785746492',
    Online: '1037152976864813096',
    Total: '1038219792357802115',
    Ratings: '1037153061631709305',
    openTickets: '1037153018132570192',
    Tickets: '1037171602141491240',

    Feedbacks: '979404977384607844',
    ticketDesign: '1011417273493360771',
    ticketFrontend: '1011417694488252577',
    ticketVideo: '1011417597532700722',
    archive: '1038221080281751603'
}

const functionFolders = fs.readdirSync('./src/functions');

for(const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter( file => file.endsWith('.js'));
    
    for(const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

const dataInfo = fs.readFileSync('./data/info.json');
client.infoData = JSON.parse(dataInfo);

client.saveData = async () => {
    fs.writeFileSync('./data/info.json', JSON.stringify(client.infoData));

    await client.channels.fetch(client.channelsLists.Ratings).then(channel => {
        let summ = 0;
        for(const rat of client.infoData.ratings) {
            summ += rat;
        }
        let name = `Rating: ${(summ / client.infoData.ratings.length).toFixed(1)}/5.0`;
        channel.edit({name: name})
    })

    await client.channels.fetch(client.channelsLists.openTickets).then(channel => {
        let name = `Open Tickets: ${client.infoData.openTickets}`;
        channel.edit({name: name})
    })

    await client.channels.fetch(client.channelsLists.Tickets).then(channel => {
        let name = `Total Tickets: ${client.infoData.totalTickets}`;
        channel.edit({name: name})
    })
}


let lastOnline = 0,
    lastTotal = 0;

setInterval( () => {
    client.guilds.fetch('948696971101732944').then(guild => {
        if( lastTotal == guild.memberCount ) return;
        lastTotal = guild.memberCount;

        client.channels.fetch(client.channelsLists.Total).then(channel => {
            let name = `Total Members: ${guild.memberCount}`;
            channel.edit({name: name})
        })
    })

    client.saveData()



    client.guilds.fetch('948696971101732944').then(guild => {
        guild.members.fetch()
            .then( (users) => {
              newOnline = guild.memberCount - users.filter(mem => !mem.presence).size;
              if( lastOnline == newOnline ) return;
              lastOnline = newOnline;


                client.channels.fetch(client.channelsLists.Online).then(channel => {
                    let name = `Online: ${lastOnline}`;
                    channel.edit({name: name})
                })
            })
        
    })
}, 15000)

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login('MTAzNzE1Njc2NDI3NTE4MzcxOA.Ga0ygl.udc_lyxtAFmXv-XGtCqDtHtOAYIvwljOC5hX2Q');