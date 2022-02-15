module.exports = {
    name: "mute",
    execute(message, msg, args, config, moment, MessageEmbed, date, embeds, bot, db){
        let member = message.mentions.members.first();
        const { guild } = message
        console.log(guild);
    }
}