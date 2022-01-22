const Discord = require('discord.js.old');
const {channel} = require("discord.js.old");
const bot = new Discord.Client();
module.exports = {
    name: 'Test2',
    description: "says ping!",
    execute(message, args) {
        message.channel.send("la palma ")
    }
}