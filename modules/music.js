const ytSearch = require( 'yt-search' );
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const stringhandler = require('../stringhandler');
const config = require('../botsetting.json');
module.exports = {
    'play': (msg, command) => {
        function play(url) {
            ytdl.getInfo(url, {downloadURL: true}, (err, info) => {
                if (err) throw err;
                let embed = new Discord.RichEmbed()
                embed.setTitle(info.title)
                embed.setURL(url)
                embed.setThumbnail(`https://img.youtube.com/vi/${info.video_id}/mqdefault.jpg`)
                embed.setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL)
                embed.setColor(`${config.color}`)
                embed.setFooter(`출처: ${info.author.name}`)
                embed.setTimestamp();
               // embed.addField('설명', info.description, true); 이건 embed 1024자 넘으면 에러 떠서 안씁니다
                msg.channel.send(embed);
            });
            msg.member.voiceChannel.join().then(connection => {
                let streamOptions = { seek: 0, volume: 1, bitrate: 64000 };
                const stream = ytdl(url, { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", end => {
                    msg.channel.send("노래가 끝났습니다!");
                    msg.member.voiceChannel.leave();
                });
            }).catch(err => console.log(err));
        }
        if(!msg.member.voiceChannel) return msg.channel.send("음성채널에서 들어가주세요!");
        if (msg.guild.me.voiceChannel) return msg.channel.send(`이미 ${msg.guild.me.voiceChannel}에서 노래를 하고 있습니다`);
        const raw = stringhandler.cutTextHead('play ', command);
        if (!raw) return msg.channel.send("인자가 없습니다");
        let url = raw;
        let validate = ytdl.validateURL(url);
        if (!validate) {
            ytSearch(url, function ( err, r ) {
                try {
                    for( i = 1; i < 6; i ++){
                    msg.channel.send( i+" 번쨰 "+r.videos[i].title);
                    }
                   // play("https://youtube.com" + r.videos[0].url);
                } catch {
                    msg.channel.send("검색 결과가 없습니다!");
                }
            });
        } else {
            play(url)
        }
    },
    'exit': (msg, command) => {
        if (msg.guild.me.voiceChannel) msg.member.voiceChannel.leave();
    },
};