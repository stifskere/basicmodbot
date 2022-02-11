module.exports = {
    name: "level",
    execute(message, args, config, moment, RichEmbed, date, embeds, bot, db){

        let user = message.content.split(" ")[1];
        if(!user){
            user = message.author.id;
        }
        console.log(user);
            let member = user.toString().replace(/[\\<>@#&!']/g, "")
        db.all(`SELECT * FROM levelstable WHERE UserID = ?`, [member], (err, row) =>{
            if(err){console.log(err);message.channel.send(err7); return;}
            row.forEach( function (rows){
                let messages = rows.messages
                let level = rows.level
                const levelembed = new RichEmbed()
                    .setColor(config.Embedcolor)
                    .setTitle(``)
                    .addField('Mention', `<@${member.toString()}>`)
                    .setDescription(`Level: ${level} Messages: ${messages}`)
                message.channel.send(levelembed)
            })

    })}
}