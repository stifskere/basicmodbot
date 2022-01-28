module.exports = {
    name: 'warn',
    execute(message, args, config, moment, RichEmbed, date, embeds, bot, db, insertcases) {
        let member = message.mentions.members.first();
        let moderator = message.author.tag;
        if(!member) {
            message.channel.send(err1);
            console.log("Command Warn || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 1\n `)
            return;
        }
        let reason = args.slice(2).join(' ');
        if(!reason){
            reason = "no reason provided";
        }
        const Warnembed = new RichEmbed()
            .setTitle(`Warn successful`)
            .setColor(config.Embedcolor)
            .addField(`User ${member.displayName} with id ${member.id}`, `**Was warned for the Reason:** ${reason}`)
            .setTimestamp()
        message.channel.send(Warnembed);
        var memberid = member.id;
        insertcases.run(`${memberid}`, `${reason}`, `Warn`, `${moderator}`)
        console.log("Command Warn || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member Kicked: ${member.displayName} with id ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}