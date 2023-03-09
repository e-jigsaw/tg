import { Telegraf } from "telegraf";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFileSync } from "fs";

const emoji = JSON.parse(readFileSync("sticker.json").toString());

const bot = new Telegraf(process.env.TOKEN!);

const PROD_ROOM = parseInt(process.env.PROD_ROOM!);
const DEV_ROOM = parseInt(process.env.DEV_ROOM!);

const app = new Hono();
app.get("/", (ctx) => {
  return ctx.json({ ok: true });
});
app.get("/ping", async (ctx) => {
  const res = await bot.telegram.sendMessage(
    ctx.req.query("prod") !== undefined ? PROD_ROOM : DEV_ROOM,
    "pong"
  );
  if (res.message_id) {
    return ctx.json({ ok: true });
  } else {
    return ctx.json({ ok: false });
  }
});
app.get("/good", async (ctx) => {
  const res = await bot.telegram.sendSticker(
    ctx.req.query("prod") !== undefined ? PROD_ROOM : DEV_ROOM,
    emoji.good
  );
  if (res.message_id) {
    return ctx.json({ ok: true });
  } else {
    return ctx.json({ ok: false });
  }
});
app.get("/ok", async (ctx) => {
  const res = await bot.telegram.sendSticker(
    ctx.req.query("prod") !== undefined ? PROD_ROOM : DEV_ROOM,
    emoji.ok
  );
  if (res.message_id) {
    return ctx.json({ ok: true });
  } else {
    return ctx.json({ ok: false });
  }
});

serve({ fetch: app.fetch, port: 3001 });
