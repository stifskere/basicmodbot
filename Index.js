const Discord = require('discord.js.old');
const intents = ["GUILDS", "GUILD_MEMBERS"];
const sqlite = require('sqlite3').verbose();
const bot = new Discord.Client();
const config = require("./Config.json")
const moment = require('moment');
const token = config.Token;
const PREFIX = "-";
const { RichEmbed } = require('discord.js.old');
const date = new Date;
const embeds = require('./Embeds.js')

const fs = require('fs');
const {GuildMember} = require("discord.js.old");
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log(`Active as ${bot.user.tag}`);
});

bot.on("guildMemberAdd", (member) =>{
   const userwelcomeembed = new RichEmbed()
       .setTitle("New member joined")
       .addField(`${member}`, `joined the server`)
       .setTimestamp()
    const userwelcomechannelget = guild.channels.find(channel => channel.name.includes("general" || "lounge" || "chat"));
   bot.channels.get(userwelcomechannelget.id).send(userwelcomeembed);
});

bot.on('message', message => {
    const msg = message.content.toLowerCase()
    if(msg.startsWith(config.Prefix)){
        let args = msg.substring(PREFIX.length).split(" ");

        let db  = new sqlite.Database(`./Databases/${message.guild.id}.db` , sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
        db.run(`CREATE TABLE IF NOT EXISTS bannedusers(UserID INTEGER NOT NULL, reason TEXT NOT NULL)`)
        db.run(`CREATE TABLE IF NOT EXISTS warnedusers(UserID INTEGER NOT NULL, reason TEXT NOT NULL)`)
        db.run(`CREATE TABLE IF NOT EXISTS kickedusers(UserID INTEGER NOT NULL, reason TEXT NOT NULL)`)

        const insertban = db.prepare(`INSERT INTO bannedusers VALUES (?,?)`)
        const insertwarn = db.prepare(`INSERT INTO warnedusers VALUES (?,?)`)
        const insertkick = db.prepare(`INSERT INTO kickedusers VALUES (?,?)`)

        switch (args[0]) {
            //commands

                //command 1
            case "help":
                if(args[1] === "moderation"){
                    let helpvar = 1;
                    bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                    return;
                }else if(args[1] === "misc"){
                    let helpvar = 2;
                    bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                    return;
                }else if(!args[1]){
                    let helpvar = 0;
                    bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                }else{
                    let helpvar = 4;
                    bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                }
                break;

                //command 2
            case "ban":
                bot.commands.get('Ban').execute(message, args, config, moment, RichEmbed, date, embeds, db, insertban);
                break;

                //command 3
            case "kick":
                bot.commands.get('Kick').execute(message, args, config, moment, RichEmbed, date, embeds, db, insertkick);
                break;

                //command 4
            case "unban":
                bot.commands.get('unban').execute(message, args, config, moment, RichEmbed, date, embeds, bot);
                break;

            case "unkick":
                const unkick = new RichEmbed()
                    .setTitle('unkick')
                    .setColor(config.Embedcolor)
                    .addField("Why don't you", "unkick deez nuts?")
                    message.channel.send(unkick);
                break;
        }
    }});

bot.on('guildCreate', guild => {
    const wlcmessage = guild.channels.find(channel => channel.name.includes("general" || "lounge" || "chat"));
    bot.channels.get(wlcmessage.id).send(wlc);
}); bot.login(token);