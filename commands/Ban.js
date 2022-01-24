const Discord = require('discord.js.old');
const bot = new Discord.Client();
const config = require("../Config.json")
const moment = require('moment');
const PREFIX = "-";
const { RichEmbed } = require('discord.js.old');
module.exports = {
    name: 'Ban',
    description: "says ping!",
    execute(message, args) {
        let member = message.mentions.members.first();
        const err1 = new RichEmbed()
            .setTitle("Error #1")
            .setColor(config.Errorembedcolor)
            .addField("Mention a valid member", "You must mention by a ping a member inside this server")
        const err2 = new RichEmbed()
            .setTitle("Error #2")
            .setColor(config.Errorembedcolor)
            .addField("User can't be banned", "This user can't be banned because of server permissions")
        if(!member) return message.channel.send(err1);
        if(!member.bannable) return message.channel.send(err2);
        let reason = args.slice(2).join(' ');
        member.ban(reason);
    }
}