module.exports = {
    name: 'Kick',
    description: "Displays help",
    execute(message, args, config, moment, RichEmbed, date){
        let member = message.mentions.members.first();
        const err1 = new RichEmbed()
            .setTitle("Error #1")
            .setColor(config.Errorembedcolor)
            .addField("Mention a valid member", "You must mention by a ping a member inside this server")
        const err5 = new RichEmbed()
            .setTitle("Error #5")
            .setColor(config.Errorembedcolor)
            .addField("User can't be kicked", "This user can't be kicked because of server permissions")
        if(!member) return message.channel.send(err1);
        if(!member.kickable) return message.channel.send(err2);
        let reason = args.slice(2).join(' ');
        const kickembed = new RichEmbed()
            .setTitle(`${member.displayname} was banned`)
            .setColor(config.Embedcolor)
            .addField(`User: ${member.displayName} with id ${member.id}`, `**was kicked for the Reason:** ${reason}`)
            .setTimestamp()
        message.channel.send(kickembed);
        member.kick(reason);
        console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member Kicked: ${member.displayName} with id ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}
