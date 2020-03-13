/*
This code was published for the first time in Toxic Codes server;
All copyrights reserved to 'Baron' , 'Idiots Group';
you can contact with me here : https://baron.netlify.com/

requirements: 

 * npm i discord.js 
	  version (12.0.2)
 * npm i canvas
 * npm i node-superfetch
 * npm i canvas-constructor

*/

const Discord = require('discord.js');
const client = new Discord.Client();
const { Canvas } = require('canvas-constructor');
const { get }  = require('node-superfetch');
const prefix = "/"

client.on('ready', () => {
  console.log('I\'m online')
})
client.on('message', async message => {
    if(!message.channel.guild) return;
    if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if (message.author.equals(client.user)) return;
    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLocaleLowerCase();

    switch (command) {
    case "members" :

      let curOnline = message.guild.members.cache.filter(m=> m.presence.status == 'online').size;
      let curOffline = message.guild.members.cache.filter(m=> m.presence.status == 'offline').size;
      let curDnd = message.guild.members.cache.filter(m=> m.presence.status == 'dnd').size;
      let curIdle = message.guild.members.cache.filter(m=> m.presence.status == 'idle').size;
      let guildMembers = message.guild.memberCount;
      if(curOnline == 0) {
        var differenceOnline = 10;
      } else {
        var differenceOnline = curOnline/guildMembers *240;
      }

      if(curOffline == 0) {
        var differenceOffline = 10;
      } else {
        var differenceOffline = curOffline/guildMembers *240;
      }

      if(curDnd == 0) {
        var differenceDnd = 10;
      } else {
        var differenceDnd = curDnd/guildMembers *240;
      }

      if(curIdle == 0) {
        var differenceIdle = 10;
      } else {
        var differenceIdle = curIdle/guildMembers *240;
      }
        var backGroundArray = await new Array('https://cdn.probot.io/profile/ScumID-1.jpg','https://cdn.probot.io/profile/ScumID-2.jpg','https://cdn.probot.io/profile/17.png','https://cdn.probot.io/profile/boy1.jpg',
                                        'https://cdn.probot.io/profile/bg-8.png','https://cdn.probot.io/profile/breakingbad.jpg','https://cdn.probot.io/profile/03404.png','https://cdn.probot.io/profile/123123123.png','https://cdn.probot.io/profile/sdffdssdf.png',
                                        'https://cdn.probot.io/profile/walking_dead2.png','https://cdn.probot.io/profile/got2.png','https://cdn.probot.io/profile/ragnar.jpg')
        var mathBackGround = await backGroundArray[Math.floor(Math.random() * backGroundArray.length)]
        var {body: guildIcon} = await get(message.guild.iconURL({ format: 'png', dynamic: true, size: 128 }))
        var {body: backGround} = await get(mathBackGround)
        //var {body: label} = await get("https://media.discordapp.net/attachments/645077429936848897/688062900484571224/label.png")
        
      const buffer = await new Canvas(540, 250)
                .setGlobalAlpha(0.5)
                .setColor('#33cc99')
                .addBeveledRect(490, 47, 50, 30)
                .setColor('#A9A9A9')
                .addBeveledRect(490, 90, 50, 30)
                .setColor('#ff3333')
                .addBeveledRect(490, 133, 50, 30)
                .setColor('#ff9933')
                .addBeveledRect(490, 176, 50, 30)
                .setGlobalAlpha(1)
                .setTextAlign('center')
                .setTextFont('bold 15px Impact')
                .setColor('#000000')
                .addText(curOnline, 519, 68)
                .addText(curOffline, 519, 111)
                .addText(curDnd, 519, 154)
                .addText(curIdle, 519, 197)
                .addBeveledImage(backGround, 0, 0, 500, 250)
                .setColor('BLACK')
                .addBeveledRect(495, -2, 5, 255, 15)
                .setColor('#303030')
                .setGlobalAlpha(0.5)
                .addBeveledRect(20, 20, 460, 210, 15)
                .fill().restore()
                .setColor("white")
                .setGlobalAlpha(0.2)
                .addBeveledRect(225,47,240, 30)
                .addBeveledRect(225,90,240, 30)
                .addBeveledRect(225,133,240, 30)
                .addBeveledRect(225,176,240, 30)
                .setGlobalAlpha(1)
                .setColor('#33cc99')
                .addBeveledRect(225,47,differenceOnline, 30)
                .setColor('#A9A9A9')
                .addBeveledRect(225,90,differenceOffline, 30)
                .setColor('#ff3333')
                .addBeveledRect(225,133,differenceDnd, 30)
                .setColor('#ff9933')
                .addBeveledRect(225,176,differenceIdle, 30)
                .setColor('#FFFFFF')
                .addBeveledRect(40, 40, 170, 170, 16)
                .fill().restore()
                .addBeveledImage(guildIcon, 40, 40, 170, 170, 16)
                .save()
                .toBuffer()

    try {

    const filename = `${message.guild.name}-members.jpg`;
    const attachment = new Discord.MessageAttachment(buffer, filename);
    await message.channel.send(attachment);

 } catch (error) {
    return message.channel.send(`An error ocurred: **${error.message}**`);
  }
      break;
    }
})
client.login('BOT_TOKEN_HERE')
