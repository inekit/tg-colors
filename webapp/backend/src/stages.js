const {
  Telegraf,
  Scenes: { Stage },
  Composer,
} = require("telegraf");
const titles = require("telegraf-steps").titlesGetter(__dirname + "/Titles");
const getUser = require("./Utils/getUser");
const tOrmCon = require("./db/connection");

const mainStage = new Stage(
  [
    ...require("./scenes/mainScene"),

    require("./scenes/adminScenes/adminScene"),
    require("./scenes/adminScenes/adminsScene"),
    require("./scenes/adminScenes/importScene"),
  ],
  {
    default: "clientScene",
  }
);

mainStage.start(async (ctx) => ctx.scene.enter("clientScene"));

mainStage.hears(titles.getValues("BUTTON_BACK_USER"), (ctx) =>
  ctx.scene.enter("clientScene")
);
mainStage.hears(titles.getValues("BUTTON_CLIENT_MENU"), async (ctx) => {
  await ctx.replyWithKeyboard("BACK_CLIENT_TITLE", "remove_keyboard");
  ctx.scene.enter("clientScene");
});

const adminStage = new Stage([
  //require("./scenes/adminScenes/adminScene"),
  // require("./scenes/adminScenes/adminsScene"),
  //require("./scenes/adminScenes/adsLinkScene"),
  //require("./scenes/adminScenes/claimsScene"),
  //require("./scenes/adminScenes/confirmCertificate"),
]);

mainStage.hears(titles.getValues("BUTTON_BACK_ADMIN"), (ctx) => {
  ctx.scene.enter("adminScene");
});

mainStage.action(/^pd\-([0-9+])$/g, async (ctx) => {
  await sendFile(ctx, ".pdf", "DECLARATION_TITLE");
});

mainStage.action(/^presentation\-([0-9+])$/g, async (ctx) => {
  await sendFile(ctx, ".txt", "PRESENTATION_TITLE");
});

async function sendFile(ctx, postfix, title) {
  await ctx.answerCbQuery().catch((e) => {});

  const item_id = ctx.match[1];
  const connection = await tOrmCon;

  const country_name = (
    await connection
      .query("select * from items where id = $1", [item_id])
      .catch(console.log)
  )?.[0]?.country_name;

  if (!country_name) return;

  const city_id = country_name === "Москва" ? "mos" : "spb";

  const filePath = `${process.env.STATIC_FOLDER}/${city_id}/${item_id}${postfix}`;

  const reply_markup = {
    inline_keyboard: [
      [
        {
          text: "Получить бесплатную консультацию",
          callback_data: "consult",
        },
      ],
      [
        {
          text: "Скачать презентацию",
          callback_data: "presentation-" + item_id,
        },
      ],
    ],
  };

  ctx.telegram
    .sendDocument(
      ctx.from.id,
      {
        filename: `${item_id}${postfix}`,
        source: filePath,
      },
      {
        caption: ctx.getTitle(title),
        reply_markup,
      }
    )
    .catch((e) => {
      console.log(e);
      ctx.telegram
        .sendMessage("NO_FILE", {
          reply_markup,
        })
        .catch(console.log);
    });
}

mainStage.on("message", async (ctx, next) => {
  console.log(ctx.message.web_app_data);
  //ctx.reply(ctx.message.web_app_data.data);
  next();
});

/*mainStage.on("web_app_data", (ctx) => {
  console.log(ctx);
  ctx.replyWithTitle("ITEM_INFO_TITLE");
});*/

mainStage.action("admin", (ctx) => ctx.scene.enter("adminScene"));

const stages = new Composer();

stages.use(Telegraf.chatType("private", mainStage.middleware()));
stages.use(Telegraf.chatType("private", adminStage.middleware()));

module.exports = stages;
