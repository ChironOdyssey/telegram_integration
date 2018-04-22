const Telegraf = require('telegraf');
const Router = require('telegraf/router');
const Extra = require('telegraf/extra');
const session = require('telegraf/session');
let counter = 1;

//reading the image file
const fs = require('fs');
let ImgFileName = "./input_images.json";
let image_urls = {};
fs.readFile(ImgFileName, (err, data) => {
    if(err) throw err;
    let image_urls1 = JSON.parse(data);
    image_urls = image_urls1['image_url']
});

//defining the markup buttons for inline keyboard
const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Cat', 'Cat_someId'),
        m.callbackButton('Dog', 'Dog_anotherId'),
        //m.callbackButton('Clear', 'clear')
    ], {columns: 2}));



