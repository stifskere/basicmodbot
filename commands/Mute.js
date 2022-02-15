module.exports = {
    name: "mute",
    execute(message, msg, args, config, moment, MessageEmbed, date, embeds, bot, db, ms, timeout){
        let member = message.mentions.members.first();
        const { guild } = message
        message.content.split(' ')

        if(!member) {
            message.channel.send({embeds: [err1]});
            console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 1\n `)
            return;
        }

        if(member.user.bot){
            message.channel.send({embeds: [err8]});
            return;
        }

        if(!member.moderatable) {
            message.channel.send({embeds: [err2]});
            console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 2\n `)
            return;
        }

        if(!time){
            message.channel.send('Time undefined')
            return;
        }

        let time = args[2]
        time = ms(time)
        if (time > ms("28d") || time < ms("1m")) {
            message.reply("time out of limit(max 28d, min 1m)");
            return
        }

        let reason = args.slice(3).join(' ');

        if(!reason){
            reason = "No reason provided";
        }

        const muteembed = new MessageEmbed()
            .setTitle(`Mute successful`)
            .setColor(config.Embedcolor)
            .addField(`User ${member.displayName} with id: ${member.id}`, `**was muted for the Reason:** ${reason}`)
            .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`})
        message.channel.send({embeds:[muteembed]});

        member.timeout(time, reason)
    }
}