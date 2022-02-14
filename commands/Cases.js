module.exports = {
    name: 'cases',
    execute(message, msg, args, config, moment, MessageEmbed, date, embeds, bot, db){

        if(!message.member.roles.has(config.Permissionrole)){
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

        const CasesEmbedRows = new MessageEmbed()
            .setTitle(`No cases`)
            .setColor(config.Embedcolor)
            .setDescription(`This user has no cases`)
            .setTimestamp()

            db.all(`SELECT * FROM casestable WHERE UserID = ?`, [member], (err, row) =>{
                if(err){console.log(err);message.channel.send(err7); return;}
                row.forEach( function (rows){
                    let reason = rows.reason
                    let type = rows.type
                    let moderator = rows.moderator
                    let membername = rows.usertag
                    CasesEmbedRows.setTitle(`Cases from:                 ‎‎`)
                    CasesEmbedRows.setDescription(`cases for: **${membername}**`)
                    CasesEmbedRows.addField(`${type}`, `reason: ${reason}\n **Moderator:** ${moderator} `)
                    amount++
                })

            message.channel.send({embeds:[CasesEmbedRows]})

        })
    }
}