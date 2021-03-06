const Discord = require('discord.js');
const stringhandler = require('../stringhandler');
const request = require('request');
const BeaJoon = require('../handlers')

module.exports = {
    '백준유저': (msg, command) => {
      let user = stringhandler.cutTextHead('백준유저', command);
      const User =  new BeaJoon.BeaJoonUser(user);
      User.search()
    },
    '개': (msg, command) => {
        let url = `http://random.dog/woof.json`;
        request(url, function (err, response, body) {
            if (err) {
                console.log(`에러발생 \n\n \`\`\`js\n${err}\n\`\`\`\n\n`);
                return;
            }
            body = JSON.parse(body);
            if (body.url) {
                let embed = new Discord.RichEmbed()
                    .setColor(`${config.color}`)
                    .setTimestamp()
                    .setImage(body.url);
                msg.channel.send(embed);
            }
        })
    },
    '네코': (msg, command) => {
        let url = `https://nekos.life/api/v2/img/neko`;
        request(url, function (err, response, body) {
            if (err) {
                console.log(`에러발생 \n\n \`\`\`js\n${err}\n\`\`\`\n\n`);
                return;
            }
            body = JSON.parse(body);
            if (body.url) {
                let embed = new Discord.RichEmbed()
                    .setColor(`${config.color}`)
                    .setTimestamp()
                    .setImage(body.url);
                msg.channel.send(embed);
            }
        })
    },
    '트위': (msg, command) => {
        let nike = stringhandler.cutTextHead('트위', command);
        const api = `https://api.twitch.tv/kraken/channels/${nike}?client_id=h5otvowaukebe06barer212ljrbz9n`;
        snekfetch.get(api).then(r => {
            let embed = new Discord.RichEmbed()
                .setAuthor(
                    `${r.body.display_name}`,
                    `${r.body.logo}`,
                    `${r.body.url}`
                )
            .setColor(config.color)
            .setThumbnail(`http://static-cdn.jtvnw.net/ttv-boxart/${encodeURI(r.body.game)}-500x500.jpg`)
            .addField('방송 제목', `${r.body.status}`, true)
            .addField('게임 중', `${r.body.game}`, true)
            .addField('팔로우 수', `${r.body.followers}`, true)
            .addField('조회수', `${r.body.views}`, true)
            .setImage(r.body.video_banner);
        msg.channel.send(embed);
       })
    },
    '네이버': (msg, command) => {
        let naver = stringhandler.cutTextHead('네이버 ', command);
        let link = `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=` + encodeURI(naver);
        if (!naver) return msg.reply(`키워드를 쳐 주세요.`);
        let embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .addField('네이버 검색:', '네이버에서 검색결과를 찾았습니다.')
            .addField("키워드:", naver)
            .addField(':', link)
            .setFooter("Betweenbot", msg.author.avatarURL);
        msg.channel.send(embed);
    },
    '다음': (msg, command) => {
        let daum = stringhandler.cutTextHead('다음 ', command);
        let link = `https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&q=` + encodeURI(daum);
        if (!daum) return msg.reply(`키워드를 쳐 주세요.`);
        let embed = new Discord.RichEmbed()
            .setColor("Blue")
            .setTimestamp()
            .addField('다음 검색:', '다음에서 검색결과를 찾았습니다.')
            .addField("키워드:", daum)
            .addField('링크:', link)
            .setFooter("Betweenbot", msg.author.avatarURL);
        msg.channel.send(embed);
    },
    '네이트': (msg, command) => {
        let nate = stringhandler.cutTextHead('네이트 ', command);
        let link = `https://search.daum.net/nate?thr=sbma&w=tot&q=` + encodeURI(nate);
        if (!nate) return msg.reply(`키워드를 쳐 주세요.`);
        let embed = new Discord.RichEmbed()
            .setColor("RED")
            .setTimestamp()
            .addField('네이트 검색:', '에서 검색결과를 찾았습니다.')
            .addField("키워드:", nate)
            .addField('링크:', link)
            .setFooter("Betweenbot", msg.author.avatarURL);
        msg.channel.send(embed);
    },
};
