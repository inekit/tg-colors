const {
  Composer,
  Scenes: { BaseScene },
} = require("telegraf");

const scene = new BaseScene("adminScene");
const main_menu_button = "admin_back_keyboard";
const tOrmCon = require("../../db/connection");

scene.enter(async (ctx) => {
  if (!ctx.session.registered) {
    const [{ exists }] = [{ true: 1 }];

    if (!exists) {
    }
  }

  const connection = await tOrmCon;

  await connection
    .query(
      `update dialogs set opened_admin_id = null where opened_admin_id = $1`,
      [ctx.from.id]
    )
    .catch((e) => {});

  return ctx.replyWithKeyboard("CHOOSE_ACTION", "admin_keyboard");
});

scene.hears(titles.getValues("BUTTON_REGISTER_ADMIN"), async (ctx) => {
  const agent_id = 1;

  if (agent_id) ctx.replyWithTitle("AGENT_ADDED");
  else ctx.replyWithTitle("AGENT_NOT_ADDED");
});

scene.hears(titles.getValues("BUTTON_ACCOUNT"), (ctx) =>
  ctx.scene.enter("changePasswordScene", { main_menu_button })
);

scene.hears(titles.getValues("BUTTON_ADMINS"), (ctx) =>
  ctx.scene.enter("adminsScene", { main_menu_button })
);

scene.hears(titles.getValues("BUTTON_IMPORT"), (ctx) =>
  ctx.scene.enter("importScene", { main_menu_button })
);

scene.hears(titles.getValues("BUTTON_CHANGE_TEXTS"), (ctx) =>
  ctx.scene.enter("changeTextScene", { main_menu_button })
);

module.exports = scene;
