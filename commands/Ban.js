module.exports = {
    name: 'Ban',
    execute(message, args, config, moment, RichEmbed, date, embeds, db, insertcases) {
        let member = message.mentions.members.first();
        if(!member) {
            message.channel.send(err1);
            console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 1\n `)
            return;
        }
        if(!member.bannable) {
            message.channel.send(err2);
            console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 2\n `)
            return;
        }
        let reason = args.slice(2).join(' ');
        if(!reason){
            reason = "no reason provided"
        }
        const banembed = new RichEmbed()
            .setTitle(`ban successful`)
            .setColor(config.Embedcolor)
            .addField(`User ${member.displayName} with id: ${member.id}`, `**was banned for the Reason:** ${reason}`)
            .setTimestamp()
        message.channel.send(banembed);
        member.ban(reason);
        var memberid = member.id;
        insertcases.run(`${memberid}`, `${reason}`, `ban`)
        console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member banned: ${member.displayName} with id: ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}