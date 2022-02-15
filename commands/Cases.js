const discord = require('discord.js')
module.exports = {
    name: 'cases',
    execute(message, msg, args, config, moment, MessageEmbed, date, embeds, bot, db){

        let member =  message.mentions.members.first();

        if(!message.member.roles.cache.has(config.Permissionrole)){
            message.channel.send({embeds: [err2]});
            return;
        }

        let amount = 1;
        
        if(!member){
            message.channel.send({embeds: [err5]});
            return;
        }

        if(member.user.bot) {
            message.channel.send({embeds: [err8]});
            return;
        }

        member = member.toString().replace(/[\\<>@#&!']/g, "")

        const CasesEmbedRows = new MessageEmbed()
            .setTitle(`No cases`)
            .setColor(config.Embedcolor)
            .setDescription(`This user has no cases`)
            .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`})

            db.all(`SELECT * FROM casestable WHERE UserID = ?`, [member], (err, row) =>{
                if(err){console.log(err);message.channel.send({embeds: [err7]}); return;}
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