module.exports = {
    name: 'cases',
    execute(message, msg, args, config, moment, RichEmbed, date, embeds, bot, db){

        if(!message.member.roles.has('929069119763021875')){
            message.channel.send(err2);
            return;
        }

        let amount = 1;
        let member =  args.slice(1).join(' ');
        
        if(!member){
            message.channel.send(err5);
            return;
        }

        member = member.toString().replace(/[\\<>@#&!']/g, "")

        let membername

        const CasesEmbedRows = new RichEmbed()
            .setTitle(`Cases from:                 ‎‎`)
            .setColor(config.Embedcolor)
            .setTimestamp()

            db.all(`SELECT * FROM casestable WHERE UserID = ?`, [member], (err, row) =>{
                if(err){console.log(err);message.channel.send(err7); return;}
                row.forEach( function (rows){
                    let reason = rows.reason
                    let type = rows.type
                    let moderator = rows.moderator
                    let membername = rows.usertag

                    CasesEmbedRows.setDescription(`**${membername}**`)
                    CasesEmbedRows.addField(`${type}`, `reason: ${reason}\n **Moderator:** ${moderator} `)
                    amount++
                })

            message.channel.send(CasesEmbedRows)

        })
    }
}