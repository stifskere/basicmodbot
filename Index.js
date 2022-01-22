const Discord = require('discord.js.old');
const bot = new Discord.Client();
const config = require("./Config.json")
const moment = require('moment');
const token = config.Token;
const PREFIX = "-";
const { RichEmbed } = require('discord.js.old');

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

bot.on(GuildMember.add, member => {
    bot.channel.get('931147953454862408').send(member + " Welcome!");
});



bot.on('message', message => {
    const msg = message.content.toLowerCase()
    if(msg.startsWith(config.Prefix)){
        let args = msg.substring(PREFIX.length).split(" ");
        switch (args[0]) {

            //commands
                //command 1
            case "help":
                if(args[1] === "moderation"){
                    let helpvar = 1;
                    bot.commands.get('Help').execute(message, config, args, helpvar, moment);
                    return;
                }else if(args[1] === "misc"){
                    let helpvar = 2;
                    bot.commands.get('Help').execute(message, config, args, helpvar, moment);
                    return;
                }else if(!args[1]){
                    let helpvar = 0;
                    bot.commands.get('Help').execute(message, config, args, helpvar, moment);
                }else{
                    return;
                }
                break;


            //command 2
            case "ban":
                bot.commands.get('Test2').execute(message, config, args, moment);
                console.log("Command ban ||" + Date.now())
                break;

        }
    }});

bot.on('guildCreate', guild => {
    const wlcmessage = guild.channels.find(channel => channel.name.includes("general" || "lounge" || "chat"));
    const wlcmessageID = wlcmessage.id;
    const wlc = new RichEmbed()
        .setColor('#0099ff')
        .setTitle('Thanks for adding this bot')
        .setDescription("If you see this, it means you were able\n to make your bot work, further configuration is required")
        .addField("How do i configure my bot?", "Go to 'Configuration.html' in your bot files and\n you will be able to modify your bot configuration with an intuitive UI")
        .setImage('https://media.discordapp.net/attachments/858068843570003998/934108621619474442/20220118_034829.gif')
        .setFooter("Bot coded by: Mewa#6969","https://cdn.discordapp.com/attachments/931147953454862408/934271205060526120/Sin_titulo-2.png")

    bot.channels.get(wlcmessageID).send(wlc);
});



bot.login(token);