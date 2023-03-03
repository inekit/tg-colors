const {
  Telegraf,
  Composer,
  Scenes: { WizardScene },
} = require("telegraf");
const moment = require("moment");
const { CustomWizardScene } = require("telegraf-steps");
const tOrmCon = require("../../db/connection");
const authAdmin = require("../../Utils/authAdmin");
const FilesHandler = require("../../Utils/fileHandler");

const scene = new CustomWizardScene("changeTextScene");

scene.enter(async (ctx) => {
  const { edit, main_menu_button } = ctx.scene.state;

  const keyboard = "change_text_actions_keyboard";
  const title = ctx.getTitle("CHANGE_TEXT");

  if (main_menu_button) await ctx.replyWithKeyboard("⚙️", main_menu_button);

  ctx.replyWithKeyboard(title, keyboard);
});

scene.action(/^change\_(.+)$/g, async (ctx) => {
  await ctx.answerCbQuery().catch(console.log);

  ctx.scene.state.input = { type: ctx.match[1] };

  await ctx.replyWithTitle(
    ctx.getTitle("CURRENT_TEXT", [ctx.getTitle(ctx.match[1])])
  );

  ctx.wizard.selectStep(1);
});

scene.addNullStep().addStep({
  variable: "text",
  type: "confirm",
  cb: async (ctx) => {
    const { type, text } = ctx.scene.state.input;

    try {
      await ctx.setTitle(type, text);

      await ctx.answerCbQuery(ctx.getTitle("CHANGE_TEXT_SUCCESS"), {
        show_alert: true,
      });
    } catch (e) {
      console.log(e);
      await ctx
        .answerCbQuery(ctx.getTitle("CHANGE_TEXT_ERROR"), {
          show_alert: true,
        })
        .catch(console.log);
    }

    ctx.scene.enter("changeTextScene");
  },
});

module.exports = scene;
