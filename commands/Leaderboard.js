module.exports = {
    name: "leaderboard",
    execute(message, args, config, moment, MessageEmbed, date, embeds, bot, db){
        const { guild } = message
        const leaderboardembed = new MessageEmbed()
            .setColor(config.Embedcolor)
            .setTitle(`${guild.name} leaderboard`)
            .setDescription(`This are the users with more level in ${guild.name}`)
            .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`})
        let amount = 1

        db.all(`SELECT * FROM levelstable ORDER BY messages DESC LIMIT 3`, (err, row) => {
            if(err){
                console.log(err)
                message.channel.send(`err getting data`)
                return;
            }
            row.forEach(function (rows){
                let messageCount = rows.messages
                let user = rows.usertag
                let level = rows.level
              leaderboardembed.addField(`**TOP ${amount}.**`, `**${user}** with ${messageCount} messages and level ${level}`)
                amount++
            })
            message.channel.send({embeds: [leaderboardembed]})
        })
    }
}