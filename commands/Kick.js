module.exports = {
    name: 'Kick',
    description: "Kicks mentioned user",
    execute(message, args, config, moment, RichEmbed, date, embeds){
        let member = message.mentions.members.first();
        if(!member) {
            message.channel.send(err1);
            console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 1\n `)
            return;
        }
        if(!member.kickable){
            message.channel.send(err4);
            console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 4\n `)
            return;
        }
        let reason = args.slice(2).join(' ');
        const kickembed = new RichEmbed()
            .setTitle(`Kick successful`)
            .setColor(config.Embedcolor)
            .addField(`User ${member.displayName} with id ${member.id}`, `**was kicked for the Reason:** ${reason}`)
            .setTimestamp()
        message.channel.send(kickembed);
        member.kick(reason);
        console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member Kicked: ${member.displayName} with id ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}
