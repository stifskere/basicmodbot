const Discord = require('discord.js.old');
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
const path = require('path');
bot.commands = new Discord.Collection();

var commandsfolder = path.resolve(`commands`)
var databasesfolder = path.resolve(`Databases`)

const commandFiles = fs.readdirSync(commandsfolder).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(path.join(commandsfolder, file));

    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log(`Active as ${bot.user.tag}`);
   bot.user.setActivity("Server test run")
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

    if (message.author.bot || message.guild === null) {
        return;
    }

    let db = new sqlite.Database(path.join(databasesfolder, `${message.guild.id}.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
    db.run(`CREATE TABLE IF NOT EXISTS casestable(UserID INTEGER NOT NULL, reason TEXT NOT NULL, type TEXT NOT NULL, moderator TEXT NOT NULL, usertag TEXT NOT NULL)`)
    db.run(`CREATE TABLE IF NOT EXISTS levelstable(UserID INTEGER NOT NULL, messages INTEGER NOT NULL, level INTEGER NOT NULL)`)
    db.run(`CREATE TABLE IF NOT EXISTS datatable(type TEXT NOT NULL, bool INTEGER NOT NULL)`)

    db.get(`SELECT * FROM levelstable WHERE Userid = ?`, [message.author.id], (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        if (row === undefined) {
            db.run(`INSERT INTO levelstable VALUES(?,?,?)`, [message.author.id, 0, 1])
        } else {
            const messageN = row.messages
            const levelN = row.level
            db.run(`UPDATE levelstable SET messages = ? WHERE UserID = ?`, [messageN + 1, message.author.id])
            if (messageN == levelN * 500) {
                db.run(`UPDATE levelstable SET level = ? WHERE UserID = ?`, [levelN + 1, message.author.id]);
                message.channel.send(`Congratulations you leveled up to level ${levelN + 1}`)
            }
        }
    })

    const msg = message.content.toLowerCase()
    if(msg.startsWith(config.Prefix)) {
        let args = msg.substring(PREFIX.length).split(" ");

        try {
            switch (args[0]) {
                //commands

                //command 1
                case "help":
                    if (args[1] === "moderation") {
                        let helpvar = 1;
                        bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                        return;
                    } else if (args[1] === "misc") {
                        let helpvar = 2;
                        bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                        return;
                    } else if (!args[1]) {
                        let helpvar = 0;

                        bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                    } else {
                        let helpvar = 4;
                        bot.commands.get('Help').execute(message, args, config, moment, RichEmbed, date, helpvar, embeds);
                    }
                    break;

                //command 2
                case "ban":
                    bot.commands.get('Ban').execute(message, args, config, moment, RichEmbed, date, embeds, db);
                    break;

                //command 3
                case "kick":
                    bot.commands.get('Kick').execute(message, args, config, moment, RichEmbed, date, embeds, db);
                    break;

                //command 4
                case "unban":
                    bot.commands.get('unban').execute(message, args, config, moment, RichEmbed, date, embeds, bot);
                    break;
                //command 5
                case "unkick":
                    const unkick = new RichEmbed()
                        .setTitle('unkick')
                        .setColor(config.Embedcolor)
                        .addField("Why don't you", "unkick deez nuts?")
                    message.channel.send(unkick);
                    break;
                //command 6
                case "cases":
                    bot.commands.get('cases').execute(message, msg, args, config, moment, RichEmbed, date, embeds, bot, db)
                    break;

                //command 7
                case "warn":
                    bot.commands.get('warn').execute(message, args, config, moment, RichEmbed, date, embeds, bot, db)
                    break;

                //command8
                case "level":
                    bot.commands.get('level').execute(message, args, config, moment, RichEmbed, date, embeds, bot, db)
            }
        } catch (err) {
            console.log(err);
        }
    }})

bot.on('guildCreate', guild => {
    const wlcmessage = guild.channels.find(channel => channel.name.includes("general" || "lounge" || "chat"));
    bot.channels.get(wlcmessage.id).send(wlc);
}); bot.login(token);