module.exports = {
    name: 'warn',
    execute(message, args, config, moment, RichEmbed, date, embeds, bot, db) {

        if(!message.member.roles.has(config.Permissionrole)){
            message.channel.send(err2);
            return;
        }

        let member = message.mentions.members.first();
        let moderator = message.author.tag;
        if(!member) {
            message.channel.send(err1);
            console.log("Command Warn || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 1\n `)
            return;
        }

        if(member.user.bot){
            message.channel.send(err8);
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
        db.get(`SELECT * FROM casestable WHERE UserID = ?`, [memberid], (err, row) => {
            if(err){console.log(err7); return;}
//            if(row === undefined){
//                db.run(`INSERT INTO casestable VALUES(?,?,?,?,?)`,[memberid, reason, 'Warn', moderator, member.displayName])
//            }

            else {
                db.run(`INSERT INTO casestable VALUES(?,?,?,?,?)`,[memberid, reason, 'Warn', moderator, member.displayName])
            }
        })

        console.log("Command Warn || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member warned: ${member.displayName} with id ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}