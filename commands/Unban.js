module.exports = {
    name: 'unban',
    async execute(message, args, config, moment, MessageEmbed, date, embeds, bot) {

        if(!message.member.roles.cache.has(config.Permissionrole)){
            message.channel.send({embeds: [err2]});
            return;
        }

        let member = message.content.split(" ")[1]

        if(!member){
            message.channel.send({embeds: [err5]});
            console.log("Command Unban || " + moment(date.now).format("DD/MM/YYYY hh:mm:ss") + ` || Error 5\n `)
            return;
        }
        let reason = args.slice(2).join(' ');
        if(!reason){
            reason = "no reason provided"
        }
        const unbanembed = new MessageEmbed()
            .setTitle(`Unban successful`)
            .setColor(config.Embedcolor)
            .addField(`User: ${member}`, `**was unbanned for the Reason:** ${reason}`)
            .setFooter({text: `${moment(date.now).format("DD/MM/YYYY")}`})
        message.channel.send({embeds: [unbanembed]})
        message.channel.guild.unban(member)
    }}
