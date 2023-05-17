const { Engine, telegraf } = require("telegraf-steps");
require("dotenv").config();
const fs = require("fs");
const allowed_updates = ["message", "callback_query", "chat_member"];
const TOKEN = process.env.BOT_TOKEN;
const server = require("./server/app");
const keyboards = {
  ...require("./Keyboards/keyboards"),
  ...require("./Keyboards/inlineKeyboards"),
};

const { bot, ctx, titles } = new Engine(
  TOKEN,
  __dirname + "/Titles",
  keyboards
);

global.titles = titles;

console.log("started");

(async () => {
  bot.use(telegraf.session(), require("./stages"));
  bot.action(/^.+$/g, (ctx) => ctx.answerCbQuery().catch((e) => {}));

  server(ctx);

  if (process.env.NODE_ENV === "production") {
    bot.catch(console.error);

    const secretPath = `/telegraf/${bot.secretPathComponent()}`;

    console.log(secretPath);

    const tlsOptions = {
      key: fs.readFileSync("/etc/ssl/certs/rootCA.key"),
      cert: fs.readFileSync("/etc/ssl/certs/rootCA.crt"),
      ca: [fs.readFileSync("/etc/ssl/certs/rootCA.crt")],
    };

    bot.telegram
      .setWebhook(`${process.env.SERVER_URI}${secretPath}`, {
        certificate: { source: fs.readFileSync("/etc/ssl/certs/rootCA.crt") },
        allowed_updates,
        drop_pending_updates: true,
      })
      .then((r) => {
        console.log(r);
      });

    await bot.startWebhook(secretPath, null, 3007);

    console.log(await ctx.telegram.getWebhookInfo());
  } else {
    await bot.launch({
      allowedUpdates: allowed_updates,
      dropPendingUpdates: true,
    });
  }
})();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
