const Discord = require('discord.js');
const sqlite = require('sqlite3').verbose();
const config = require("./Config.json");
const moment = require('moment');
const PREFIX = "-";
const { Client, MessageEmbed, guild, Timeout, Intents} = require('discord.js');
const bot = new Client({ intents: new Intents(32767) });
const date = new Date;
const embeds = require('./Embeds.js');
const fs = require('fs');
const path = require('path');
const readline = require("readline");
const ms = require('ms');
const axios = require('axios');
const canvas = require('canvas');
const {Canvas} = require("canvas");
bot.commands = new Discord.Collection();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(config.Token_prompt === "True" || "true"){
console.log("What token do you want to start with? (Leave it blank if you want to start with program configured token)")
console.log("You can set config token or disable this question in the configuration program (disabling the question will always start with config program token)")
process.stdin.isTTY = process.stdout.isTTY = true;
rl.question("Answer: ",  function (token){

    if(token === ""){
        token = config.Token
    }

    bot.login(`${token}`)

    bot.on('ready', () => {
        console.log(`Active as ${bot.user.tag}\nbot made by Mewa#6969`);
        bot.user.setActivity(config.Statusstring)

    });

})} else if(config.Token_prompt === "False" || "false") {

    let token = config.Token;
    bot.login(token);

    bot.on('ready', () => {
        console.log(`Active as ${bot.user.tag}\nbot made by Mewa#6969`);
        bot.user.setActivity("In development")

    });

}


let commandsfolder = path.resolve(`commands`)
let databasesfolder = path.resolve(`Databases`)
let Canvabase = path.resolve(`sources\\Canvasback.png`)

const commandFiles = fs.readdirSync(commandsfolder).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(path.join(commandsfolder, file));

    bot.commands.set(command.name, command);
}

bot.on("guildMemberAdd", (member) =>{

    axios.get(`https://discord.com/api/users/${member.user.id}`, {
        headers: {
            Authorization: `Bot ${bot.token}`,
        },
    })
        .then((res) => {
           const { banner, accent_color } = res.data;

            if(banner) {
                const extension = banner.startsWith("a_") ? '.gif' : `'.png`;
                const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;
                const userwelcomeembed = new MessageEmbed()
                    .setTitle("New member joined")
                    .addField(`${member.user.username}#${member.user.discriminator}`, `joined the server`, true)
                    .setImage(url)
                    .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`, iconURL: `${member.user.avatarURL()}`})

                bot.channels.cache.get('931147953454862408').send({embeds: [userwelcomeembed]})
            }else{
                const canvas = Canvas.createCanvas(700, 250);
                const context = canvas.getContext('2d');
                let background = Canvabase
                context.drawImage(background, 700, 250, canvas.width, canvas.height);
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), Canvabase);

                const userwelcomeembed = new MessageEmbed()
                    .setTitle("New member joined")
                    .addField(`${member.user.username}#${member.user.discriminator}`, `joined the server`, true)
                    .setImage(attachment)
                    .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`, iconURL: `${member.user.avatarURL()}`})

                bot.channels.cache.get('931147953454862408').send({embeds: [userwelcomeembed]})
            }
        });

});

bot.on('messageCreate', message => {

    if (message.author.bot || message.guild === null) {
        return;
    }

    let db = new sqlite.Database(path.join(databasesfolder, `${message.guild.id}.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
    db.run(`CREATE TABLE IF NOT EXISTS casestable(UserID INTEGER NOT NULL, reason TEXT NOT NULL, type TEXT NOT NULL, moderator TEXT NOT NULL, usertag TEXT NOT NULL)`)
    db.run(`CREATE TABLE IF NOT EXISTS levelstable(UserID INTEGER NOT NULL, messages INTEGER NOT NULL, level INTEGER NOT NULL, usertag TEXT NOT NULL)`)
    db.run(`CREATE TABLE IF NOT EXISTS datatable(type TEXT NOT NULL, bool INTEGER NOT NULL)`)

    db.get(`SELECT * FROM levelstable WHERE Userid = ?`, [message.author.id], (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        if (row === undefined) {
            db.run(`INSERT INTO levelstable VALUES(?,?,?,?)`, [message.author.id, 0, 1, message.author.tag])
        } else {
            const messageN = row.messages
            const levelN = row.level
            db.run(`UPDATE levelstable SET messages = ? WHERE UserID = ?`, [messageN + 1, message.author.id])
            if (messageN === levelN * 500) {
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
                        bot.commands.get('Help').execute(message, args, config, moment, MessageEmbed, date, helpvar, embeds);
                        return;
                    } else if (args[1] === "misc") {
                        let helpvar = 2;
                        bot.commands.get('Help').execute(message, args, config, moment, MessageEmbed, date, helpvar, embeds);
                        return;
                    } else if (!args[1]) {
                        let helpvar = 0;

                        bot.commands.get('Help').execute(message, args, config, moment, MessageEmbed, date, helpvar, embeds);
                    } else {
                        let helpvar = 4;
                        bot.commands.get('Help').execute(message, args, config, moment, MessageEmbed, date, helpvar, embeds);
                    }
                    break;

                //command 2
                case "ban":
                    bot.commands.get('Ban').execute(message, args, config, moment, MessageEmbed, date, embeds, db);
                    break;

                //command 3
                case "kick":
                    bot.commands.get('Kick').execute(message, args, config, moment, MessageEmbed, date, embeds, db);
                    break;

                //command 4
                case "unban":
                    bot.commands.get('unban').execute(message, args, config, moment, MessageEmbed, date, embeds, bot);
                    break;
                //command 5
                case "unkick":
                    const unkick = new MessageEmbed()
                        .setTitle('unkick')
                        .setColor(config.Embedcolor)
                        .addField("Why don't you", "unkick deez nuts?")
                        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`})
                    message.channel.send(unkick);
                    break;
                //command 6
                case "cases":
                    bot.commands.get('cases').execute(message, msg, args, config, moment, MessageEmbed, date, embeds, bot, db)
                    break;

                //command 7
                case "warn":
                    bot.commands.get('warn').execute(message, args, config, moment, MessageEmbed, date, embeds, bot, db)
                    break;

                //command8
                case "level":
                    bot.commands.get('level').execute(message, args, config, moment, MessageEmbed, date, embeds, bot, db)
                    break;

                //command9
                case "leaderboard":
                    bot.commands.get('leaderboard').execute(message, args, config, moment, MessageEmbed, date, embeds, bot, db)
                    break;

                //command10
                case "mute":
                    bot.commands.get('mute').execute(message, guild, msg, args, config, moment, MessageEmbed, date, embeds, bot, db, Timeout, ms)

            }
        } catch (err) {
            console.log(err);
        }
    }})

bot.on('guildCreate', guild => {
    const wlcmessage = guild.channels.find(channel => channel.name.includes("general" || "lounge" || "chat"));
    bot.channels.get(wlcmessage.id).send({embeds: [wlc]});
});