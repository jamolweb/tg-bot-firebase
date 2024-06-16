const { Telegraf } = require("telegraf");
const TOKEN = "7166578430:AAEk_i7CAtEF_6NfTAeU99ihINCWMDX6G6c";
const bot = new Telegraf(TOKEN);

const web_link = "https://tg-bot-app-teal.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome MuddaFukas :)", {
    reply_markup: {
      keyboard: [[{ text: "Open Web App", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
