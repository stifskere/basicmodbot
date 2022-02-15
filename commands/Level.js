module.exports = {
    name: "level",
    execute(message, args, config, moment, MessageEmbed, date, embeds, bot, db){

        let user = message.members.members.first()
        if(!user){
            user = message.author.id;
        }
        console.log(user);
            let member = user.toString().replace(/[\\<>@#&!']/g, "")
        db.all(`SELECT * FROM levelstable WHERE UserID = ?`, [member], (err, row) =>{
            if(err){console.log(err);message.channel.send({embeds: [err7]}); return;}
            row.forEach( function (rows){
                let messages = rows.messages
                let level = rows.level
                let usertag = rows.usertag

                const levelembed = new MessageEmbed()
                    .setColor(config.Embedcolor)
                    .setTitle(`Level for ${usertag}`)
                    .addField('Mention', `<@${member.toString()}>`)
                    .setDescription(`Level: ${level} Messages: ${messages}`)
                    .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`})
                message.channel.send({embeds: [levelembed]})
            })

    })}
}