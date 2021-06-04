// GrowtopiaStatusChecker - made by artemis#1234
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const exec = require('child_process').exec;
var fs = require('fs');

// used for enet process
const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

// If the bot is ready
client.once('ready', () => {
    console.log('The bot is online and ready to go!, Made by artemis#1234')
    client.user.setActivity('Bot by artemis#1234', 'PLAYING');
});

// Prefix
const PREFIX = config.prefix;

// online
var result = fs.readFileSync(config.online,{ encoding: 'utf8' })

// Commands
client.on('message', msg=> {
    let args = msg.content.substring(PREFIX.length).split(' ');
    switch(args[0]) {
        case 'status':
            isRunning(config.enet, (status) => {
                if (status == true) {
                    msg.channel.send('Server Status : **UP!**')
                }
                else if (status == false) {
                    msg.channel.send('Server Status : **DOWN!**')
                }
            })
        case 'online':
            msg.channel.send(`Online Players : **${result} players!**`)
        case 'stop':
            if(!msg.member.roles.cache.some(r=>[config.role].includes(r.name)) ) {
              return msg.reply("You don't have a permission to use this!");
              kill(`taskkill /f /im "${config.enet}"`)
            return msg.channel.send("**Server has been stopped!**");
        }
        case 'start':
            if(!msg.member.roles.cache.some(r=>[config.role].includes(r.name)) ) {
                return msg.reply("You don't have a permission to use this!")
                exec(`start "${config.enet}"`)
            return msg.channel.send("**Server has been started!**")
            }
}
})

// Login
client.login(config.token);

// ALL CREDIT GOES TO : CLAYNEID, GUCKTUBEYT.