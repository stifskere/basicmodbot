const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");
const config = require("./Config.json");
const moment = require('moment');
const date = new Date()
module.exports = {

    const: wlc = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Thanks for adding this bot')
        .setDescription("If you see this, it means you were able\n to make your bot work, further configuration may be required")
        .addField("How do i configure my bot?", "Go to 'Configuration.html' in your bot files and\n you will be able to modify your bot configuration with an intuitive UI")
        .setImage('https://media.discordapp.net/attachments/858068843570003998/934108621619474442/20220118_034829.gif')
        .setFooter({text: `Bot coded by: Mewa#6969","https://cdn.discordapp.com/attachments/931147953454862408/934271205060526120/Sin_titulo-2.png`}),

    const: err1 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("Mention a valid member", "You must mention by a ping a member inside this server")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),

    const: err2 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("Not enough permissions", "Maybe you or the bot do not have enough permissions.")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),

    const: err3 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("This help section dosen't exist", "To see more info about help sections simply input help.")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),

    const: err5 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("Specify a user", "No user specified in the server ")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),

    const: err6 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("User can't be unbanned","This user can't be unbanned because of server permissions")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),

    const: err7 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("Error gathering on data", "There was an error on reading cases database for the user")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),

    const: err8 = new MessageEmbed()
        .setTitle("Error")
        .setColor(config.Errorembedcolor)
        .addField("Not a valid user", "You can't mention bots or other than normal users")
        .setFooter({text: `${moment(date.now).format("DD/MM/YYYY hh:mm:ss")}`}),
}