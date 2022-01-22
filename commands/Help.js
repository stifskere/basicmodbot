const {RichEmbed} = require("discord.js.old");
module.exports = {
    name: 'Help',
    description: "Displays help",
    execute(message, config, args, helpvar, moment){
        //command start lmao
        const Help = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Help')
            .addField(',Help', 'Will show this message')
            .setDescription('There are various help pages for every bot function')
            .addField(',Help moderation', 'Display help in moderation commands')
            .addField(',help Misc', 'Will display help in misc commands for fun')
            .setFooter({ text: config.FooterText , iconURL: config.FooterImages });

        const Helpmoderation = new RichEmbed()
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
            .setDescription('There are a few misc commands, most of them about levels')
            .addField(',level "user"', 'if empty it will return self level value')
            .addField(',leaderboard', 'Will display a leaderboard with the 3 persons who most talked')
            .setFooter({ text: config.FooterText , iconURL: config.FooterImages });

            if(helpvar === 1){
                message.channel.send(Helpmoderation)
            }else if(helpvar === 2){
                message.channel.send(Helpmisc)
            }else if(helpvar === 0){
                message.channel.send(Help)
            }else if(helpvar >= 4){
                return;
            }

            const date = new Date();
            console.log("Command Help || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || variabletype ${helpvar}`)

    }
}