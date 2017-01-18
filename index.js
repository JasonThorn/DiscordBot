var env = require('./config.json'),
    JasBot = require('./DiscordBot/index.js'),
    Discord = require('discord.js');

var jas = new JasBot;
var discordjs = new Discord.Client();

discordjs.on("ready", function () {
    console.log("Ready to begin! Serving in " + discordjs.channels.length + " channels");
});

discordjs.on('message', function(msg)
{
    if (typeof jas.loadKeywords() !== 'undefined' && jas.loadKeywords().length > 0) {
        jas.checkMessageForKeywords(msg.content, jas.loadKeywords(), function(keyword)
        {
            if (keyword != 0) {
                jas.runKeywordFunction(jas.getKeyByValue(jas.keywords, keyword), keyword, msg, function(reply)
                {
                    discordjs.reply(msg, reply);
                });
            }
        });
    }
});

discordjs.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

discordjs.login(env.discord.email, env.discord.password);
