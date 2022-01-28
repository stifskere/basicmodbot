module.exports = {
    name: 'cases',
    execute(message, args, config, moment, RichEmbed, date, embeds, bot, db, casesquerry){
        let amount = 1;
        let member = message.mentions.users.first();
        
        if(!member){
            message.channel.send(err5);
        }
        try{
            member = member.toString().replace(/[\\<>@#&!']/g, "")
        }catch (err){
            return;
        }


        const CasesEmbedRows = new RichEmbed()
            .setTitle(`Cases from:                 ‎‎`)
            .setDescription(`${message.mentions.users.first().tag}`)
            .setColor(config.Embedcolor)
            .setTimestamp()

        db.all(casesquerry, [member], (err, row) =>{
            if(err){console.log(err);message.channel.send(err7); return;}

            row.forEach( function (rows){
                let reason = rows.reason
                let type = rows.type
                let moderator = rows.moderator

                CasesEmbedRows.addField(`${type}`, `Reason: ${reason}\n Moderator: ${moderator}`)
                amount++

            })

            message.channel.send(CasesEmbedRows)

        })
    }
}