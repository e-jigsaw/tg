import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const bot = new Telegraf(process.env.TOKEN!);

const PROD_ROOM = parseInt(process.env.PROD_ROOM!);
const DEV_ROOM = parseInt(process.env.DEV_ROOM!);

bot.on(message("text"), (ctx) => {
  if (
    ctx.update.message.chat.id === PROD_ROOM ||
    ctx.update.message.chat.id === DEV_ROOM
  ) {
    console.log(ctx.update);
  }
});

bot.launch({
  webhook: {
    domain: process.env.DOMAIN!,
    port: 3000,
  },
});
