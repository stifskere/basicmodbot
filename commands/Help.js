module.exports = {
    name: 'Help',
    execute(message, args, config, moment, RichEmbed, date, helpvar, embeds){
        //command start lmao
        const Help = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Help')
            .addField('-Help', 'Will show this message')
            .setDescription('There are various help pages for every bot function')
            .addField('-Help moderation', 'Display help in moderation commands')
            .addField('-help Misc', 'Will display help in misc commands for fun')

        const Helpmoderation = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Moderation commands')
            .setDescription('There are a few useful moderation commands')
            .addField('-ban "ping" "time" "reason"', 'bans someone for a period of time "infinite time if empty"')
            .addField('-unban "user id" "reason"', 'Unbans the specified user')
            .addField('-mute "ping" "time" "reason"', 'mutes someone for a period of time "infinite time if empty"')
            .addField('-kick "ping" "reason"', 'Kicks specified user')
            .addField('-cases "ping"', 'Shows the cases for the specified users')

        const Helpmisc = new RichEmbed()
            .setColor(config.Embedcolor)
            .setTitle('Misc commands')
            .setDescription('There are a few misc commands, most of them about levels')
            .addField('-level "user"', 'if empty it will return self level value')
            .addField('-leaderboard', 'Will display a leaderboard with the 3 persons who most talked')

            if(helpvar === 1){
                message.channel.send(Helpmoderation)
                message.channel.send(":warning: the timers and the mute command isn't available right now :warning:");
            }else if(helpvar === 2){
                message.channel.send(Helpmisc);
                message.channel.send(":warning: Misc commands aren't available right now :warning:");
            }else if(helpvar === 0){
                message.channel.send(Help)
            }else if(helpvar >= 4){
                message.channel.send(err3);
                console.log("Command Help || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 3\n `)
                return;
            }

            console.log("Command Help || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || variabletype ${helpvar}\n `)

    }
}