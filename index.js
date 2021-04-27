const { Client } = require('discord.js');
const bot = new Client();
require('dotenv').config();

var statuses = new Map();

bot.on('message', (message) => {
    if(message.author.bot || !message.guild) return;
	if(message.content.toLowerCase() == "mute mute"){
	    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You haven't got the power of **mute mute**'s god :/.");
	    var status = !(statuses.has(message.guild.id) ? true : false);
	    var channel = message.member.voice.channel;
        channel.members.each(member => { member.edit({mute: status}); });
        statuses.set(message.guild.id, status);
        if(status == false) statuses.delete(message.guild.id);
        message.channel.send(`You have ${status ? "muted" : "unmuted"} all your voice room!`);
	}
});

bot.login(process.env.TOKEN)