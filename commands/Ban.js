module.exports = {
    name: 'Ban',
    execute(message, args, config, moment, RichEmbed, date, embeds, db) {

        let moderator = message.author.tag;

        if(!message.member.roles.has('929069119763021875')){
            message.channel.send(err2);
            return;
        }

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

        //damn sql
        var memberid = member.id;
        db.get(`SELECT * FROM casestable WHERE UserID = ?`, [memberid], (err, row) => {
            if(err){console.log(err7); return;}
            if(row === undefined){
                db.run(`INSERT INTO casestable VALUES(?,?,?,?,?)`,[memberid, reason, 'ban', moderator, member.displayName])
            }

            else {
                db.run(`INSERT INTO casestable VALUES(?,?,?,?,?)`,[memberid, reason, 'ban', moderator, member.displayName])
            }
        })

        console.log("Command Ban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Member banned: ${member.displayName} with id: ${member.id}`);
        console.log(`For the reason: ${reason}\n `);
    }
}