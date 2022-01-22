const {RichEmbed, channel} = require("discord.js.old");
module.exports = {
    name: 'Help',
    description: "Displays help",
    execute(message, config, args, helpvar){
        //command start lmao
        const Help = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Help')
            .addField(',Help', 'Will show this message')
            .setDescription('There are various help pages for every bot function')
            .addField(',Help moderation', 'Display help in moderation commands')
            .addField(',help Misc', 'Will display help in misc commands for fun')
            .setFooter({ text: config.FooterText , iconURL: config.FooterImages });

        const helpmoderation = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Moderation commands')
            .addField(',Help', 'Will show this message')
            .setDescription('There are various help pages for every bot function')
            .addField(',ban "ping" "time"', 'bans someone for a period of time "infinite time if empty"')
            .addField(',mute "ping" "time"', 'mutes someone for a period of time "infinite time if empty"')
            .addField(',kick "ping"', 'Kicks specified user')
            .setFooter({ text: config.FooterText , iconURL: config.FooterImages });

        const Helpmisc = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Misc commands')
            .addField(',Help', 'Will show this message')
            .setDescription('There are various help pages for every bot function')
            .addField(',Help moderation', 'Display help in moderation commands')
            .addField(',help Misc', 'Will display help in misc commands for fun')
            .setFooter({ text: config.FooterText , iconURL: config.FooterImages });

            if(helpvar === 1){
                message.channel.send(helpmoderation)
            }else if(helpvar === 2){
                message.channel.send(Helpmisc)
            }else{
                message.channel.send(Help)
            }

            const date = new Date();
            console.log("Command Help || " + date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds() +` || variabletype ${helpvar}`)



    }
}