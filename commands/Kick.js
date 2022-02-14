const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'Kick',
    execute(message, args, config, moment, MessageEmbed, date, embeds, db){

        if(!message.member.roles.has(config.Permissionrole)){
            message.channel.send(err2);
            return;
        }

        let member = message.mentions.members.first();
        let moderator = message.author.tag;
        if(!member) {
            message.channel.send(err1);
            console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 1\n `)
            return;
        }

        if(member.user.bot){
            message.channel.send(err8);
            return;
        }

        if(!member.kickable){
            message.channel.send(err2);
            console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 2\n `)
            return;
        }

        let reason = args.slice(2).join(' ');
        if(!reason){
            reason = "no reason provided";
        }

        const kickembed = new MessageEmbed()
            .setTitle(`Kick successful`)
            .setColor(config.Embedcolor)
            .addField(`User ${member.displayName} with id ${member.id}`, `**was kicked for the Reason:** ${reason}`)
            .setTimestamp()
        message.channel.send({embeds: [kickembed]});
        member.kick(reason);

        var memberid = member.id;
        db.get(`SELECT * FROM casestable WHERE UserID = ?`, [memberid], (err, row) => {
            if(err){console.log(err7); return;}
            if(row === undefined){
                db.run(`INSERT INTO casestable VALUES(?,?,?,?,?)`,[memberid, reason, 'kick', moderator, member.displayName])
            }

            else {
                db.run(`INSERT INTO casestable VALUES(?,?,?,?,?)`,[memberid, reason, 'kick', moderator, member.displayName])
            }
        })

        console.log("Command Kick || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member Kicked: ${member.displayName} with id ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}
