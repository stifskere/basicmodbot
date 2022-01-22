const Discord = require('discord.js.old');
const bot = new Discord.Client();
const config = require("./Config.json")
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

bot.on('guildMemberAdd', member => {
    bot.channel.get('931147953454862408').send("Welcome!");
});

bot.on('message', message => {
    if(message.content.includes(config.Prefix)){
        let args = message.content.substring(PREFIX.length).split(" ");
        switch (args[0]) {

            //commands
                //command 1
            case "help":
                if(message.content.includes("moderation")){
                    let helpvar = 1;
                    bot.commands.get('Help').execute(message, config, args, helpvar);
                    return;
                }else if(message.content.toLowerCase().includes("misc")){
                    let helpvar = 2;
                    bot.commands.get('Help').execute(message, config, args, helpvar);
                    return;
                }
                let helpvar = 0;
                bot.commands.get('Help').execute(message, config, args, helpvar);
                break;


            //command 2
            case "ban":
                bot.commands.get('Test2').execute(message, config, args);
                console.log("Command prova ||" + Date.now())
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