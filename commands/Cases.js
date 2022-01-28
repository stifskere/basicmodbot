module.exports = {
    name: 'cases',
    execute(message, args, config, moment, RichEmbed, date, embeds, bot, db, casesquerry){
        let amount = 1;
        let member = message.mentions.users.first();
        let mentionmember = message.mentions.users.first();
        
        if(!member){
            message.channel.send("Specify a user");
        }
        member = member.toString().replace(/[\\<>@#&!']/g, "")

        const CasesEmbedRows = new RichEmbed()
            .setTitle(`Cases from:                 ‎‎`)
            .setDescription(`${mentionmember}`)
            .setColor(config.Embedcolor)
            .setTimestamp()

        db.all(casesquerry, [member], (err, row) =>{
            if(err){console.log(err);message.channel.send(err7); return;}

            row.forEach( function (rows){
                let reason = rows.reason
                let type = rows.type

                CasesEmbedRows.addField(`${type}`, `Reason: ${reason}`)
                amount++

            })

            message.channel.send(CasesEmbedRows)

        })
    }
}