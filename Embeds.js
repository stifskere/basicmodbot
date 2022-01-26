const Discord = require('discord.js.old');
const {RichEmbed} = require("discord.js.old");
const config = require("./Config.json")
module.exports = {
    const: wlc = new RichEmbed()
        .setColor('#0099ff')
        .setTitle('Thanks for adding this bot')
        .setDescription("If you see this, it means you were able\n to make your bot work, further configuration is required")
        .addField("How do i configure my bot?", "Go to 'Configuration.html' in your bot files and\n you will be able to modify your bot configuration with an intuitive UI")
        .setImage('https://media.discordapp.net/attachments/858068843570003998/934108621619474442/20220118_034829.gif')
        .setFooter("Bot coded by: Mewa#6969","https://cdn.discordapp.com/attachments/931147953454862408/934271205060526120/Sin_titulo-2.png"),

    const: err1 = new RichEmbed()
        .setTitle("Error #1")
        .setColor(config.Errorembedcolor)
        .addField("Mention a valid member", "You must mention by a ping a member inside this server"),

    const: err2 = new RichEmbed()
        .setTitle("Error #2")
        .setColor(config.Errorembedcolor)
        .addField("User can't be banned", "This user can't be banned because of server permissions"),

    const: err3 = new RichEmbed()
        .setTitle("Error #3")
        .setColor(config.Errorembedcolor)
        .addField("This help section dosen't exist", "To see more info about help sections simply input help."),

    const: err4 = new RichEmbed()
        .setTitle("Error #4")
        .setColor(config.Errorembedcolor)
        .addField("User can't be kicked", "This user can't be kicked because of server permissions"),

    const: err5 = new RichEmbed()
        .setTitle("Error #5")
        .setColor(config.Errorembedcolor)
        .addField("User can't be unbanned", "This user can't be unbanned since it was not in the banned users list"),

    const: err6 = new RichEmbed()
        .setTitle("Error #6")
        .setColor(config.Errorembedcolor)
        .addField("User can't be unbanned","This user can't be unbanned because of server permissions")
}