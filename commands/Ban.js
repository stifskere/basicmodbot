module.exports = {
    name: 'Ban',
    description: "says ping!",
    execute(message, args, config, moment, RichEmbed, date) {
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
        const banembed = new RichEmbed()
            .setTitle(`${member.displayname} was banned`)
            .setColor(config.Embedcolor)
            .addField(`User: ${member.displayName} with id ${member.id}`, `**was banned for the Reason:** ${reason}`)
            .setTimestamp()
        message.channel.send(banembed);
        member.ban(reason);
        console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member banned: ${member.displayName} with id: ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}