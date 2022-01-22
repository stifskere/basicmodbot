const Discord = require('discord.js.old');
const {channel} = require("discord.js.old");
const bot = new Discord.Client();
module.exports = {
    name: 'Test2',
    description: "says ping!",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if (message.mentions.members.first()) {
            message.mentions.members.first.ban().then((member) => {
                message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
            }).catch(() => {
                message.channel.send("I do not have permissions to do this");
            });
        }
    }
}