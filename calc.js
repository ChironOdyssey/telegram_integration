const Telegraf = require('telegraf');
const Router = require('telegraf/router');
const Extra = require('telegraf/extra');
const session = require('telegraf/session');
const fetch = require('node-fetch');
//const

let counter = 0;
let image_urls = {}

/*const fs = require('fs');
let ImgFileName = "./input_images.json";
let image_urls = {};
fs.readFile(ImgFileName, (err, data) => {
    if(err) throw err;
    let image_urls1 = JSON.parse(data);
    image_urls = image_urls1['image_url']
    console.log(image_urls.length);
});*/
fetch('http://192.168.1.80:3000/images', {
    mode: 'cors'
})
    .then(res => res.json())
    .then(value => image_urls = value)
    .catch(err => {
        console.log('error', err);
    })
    .then(() => {
        const markup = Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('Cat', 'Cat'),
                m.callbackButton('Dog', 'Dog'),
                //m.callbackButton('Clear', 'clear')
            ], {columns: 2}));

        const config = require('./config');
        const bot = new Telegraf(config.telegraf_token)
        bot.use(session({ ttl: 10 }))
        bot.start((ctx) => {
            ctx.session.value = 0
            //console.log(ctx.update.callback_query.from_chat_id);
            var m1 = "Hi, I am Chiron chatbot, thank you for joining the platform.";
            ctx.reply(m1);
            const hash = image_urls[counter];
            fetch(`http://192.168.1.80:3000/image/${hash}`, {
                mode: 'cors'
            })
                .then(res => res.json())
                .then(value => {
                    const buffer = value.buffer.toString();

                    ctx.replyWithPhoto(buffer, markup)
                })
                .catch(err => {
                    console.log('error', err);
                });
        });
//console.log(image_urls)
        bot.on('callback_query', (ctx)=>{
            console.log(counter = counter + 1)
            var label = [];
            //var catCount
            label.push({image_label : ctx.update.callback_query.data});
            console.log(label);
            return ctx.replyWithPhoto( image_urls[counter], markup)//.catch(() => undefined)
        });
        bot.startPolling();

        console.log("Bot started");
});


