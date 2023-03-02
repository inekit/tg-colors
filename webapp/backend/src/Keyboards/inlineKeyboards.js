const { Markup } = require("telegraf");

const callbackButton = Markup.button.callback;
const urlButton = Markup.button.url;
const webAppButton = Markup.button.webApp;
const { inlineKeyboard } = Markup;
const moment = require("moment");
const { stat } = require("fs");

exports.agree_keyboard = (ctx) =>
  inlineKeyboard([callbackButton(ctx.getTitle("AGREE_BUTTON"), "agree")]);

exports.main_admin_keyboard = (ctx) =>
  inlineKeyboard([
    callbackButton(ctx.getTitle("AGREE_BUTTON"), "agree"),
    callbackButton(ctx.getTitle("ADMIN_MENU_BUTTON"), "admin"),
  ]);
exports.yes_no_keyboard = (ctx) =>
  inlineKeyboard([
    [callbackButton(ctx.getTitle("Да"), "yes")],
    [callbackButton(ctx.getTitle("Нет"), "no")],
  ]);

exports.question1_keyboard = (ctx) =>
  inlineKeyboard([
    [callbackButton(ctx.getTitle("ANSWER_1_1"), "1")],
    [callbackButton(ctx.getTitle("ANSWER_1_2"), "2")],
    [callbackButton(ctx.getTitle("ANSWER_1_3"), "3")],
    [callbackButton(ctx.getTitle("ANSWER_1_4"), "4")],
    [callbackButton(ctx.getTitle("ANSWER_1_5"), "5")],
    [callbackButton(ctx.getTitle("ANSWER_SKIP"), "skip")],
  ]);

exports.webapp_keyboard = (ctx, id) =>
  inlineKeyboard([
    [webAppButton(ctx.getTitle("WEBAPP_BUTTON"), "https://980.ru/" + id)],
    //   [callbackButton(ctx.getTitle("ABOUT_BUTTON"), "help")],
  ]);

exports.confirm_keyboard = (ctx) =>
  inlineKeyboard([callbackButton(ctx.getTitle("BUTTON_CONFIRM"), "confirm")]);

exports.custom_keyboard = (ctx, bNames, bLinks) => {
  let k = inlineKeyboard([]);

  if (bNames.length != bLinks.length) return k;

  bNames.forEach((name, id) => {
    k.reply_markup.inline_keyboard.push([
      callbackButton(ctx.getTitle(name), bLinks[id]),
    ]);
  });

  return k;
};

exports.custom_obj_keyboard = (ctx, bNamesObj) => {
  let k = inlineKeyboard([], { columns: 3 }).resize();

  Object.entries(bNamesObj)?.forEach(([name, link], i) => {
    // console.log(name, link)
    if (i % 2 === 0)
      k.reply_markup.inline_keyboard.push([
        callbackButton(ctx.getTitle(name), link),
      ]);
    else
      k.reply_markup.inline_keyboard[
        k.reply_markup.inline_keyboard.length - 1
      ].push(callbackButton(ctx.getTitle(name), link));
  });

  return k.resize();
};

exports.dictionary_keyboard = (dictionary, tag) => {
  let k = inlineKeyboard([], { columns: 2 });

  dictionary.forEach((type_name, id) => {
    k.reply_markup.inline_keyboard.push([
      callbackButton(type_name, `${tag}-${id}`),
    ]);
  });

  return k;
};

exports.start_dialog_keyboard = (ctx, appointment_id) =>
  inlineKeyboard(
    [
      urlButton(
        ctx.getTitle(
          "SEND_DIALOG_REQUEST",
          `t.me/${ctx.botInfo.username}/?start=dialog-${appointment_id}`
        )
      ),
    ],
    {
      columns: 1,
    }
  );
exports.search_u_list_keyboard = (ctx, data, offset) => {
  const keyboard = inlineKeyboard(
    data.map(({ username, username2, id }) =>
      callbackButton(`@${username2} - @${username}`, "dialog1-" + id)
    ),
    { columns: 1 }
  );

  const b = [];

  if (offset > 0)
    b.push(
      callbackButton(
        ctx.getTitle("BUTTON_PREVIOUS"),
        `get_u_${Number(offset) - 1}`
      )
    );

  b.push(
    callbackButton(ctx.getTitle("BUTTON_NEXT"), `get_u_${Number(offset) + 1}`)
  );

  keyboard.reply_markup.inline_keyboard.push(b);

  return keyboard;
};

exports.search_a_list_keyboard = (ctx, data, offset) => {
  const keyboard = inlineKeyboard(
    data.map(({ appointment_id, id }) =>
      callbackButton("Заявка №" + appointment_id, "dialog1-" + id)
    ),
    { columns: 1 }
  );

  const b = [];

  if (offset > 0)
    b.push(
      callbackButton(
        ctx.getTitle("BUTTON_PREVIOUS"),
        `get_a_${Number(offset) - 1}`
      )
    );

  b.push(
    callbackButton(ctx.getTitle("BUTTON_NEXT"), `get_a_${Number(offset) + 1}`)
  );

  keyboard.reply_markup.inline_keyboard.push(b);

  return keyboard;
};

exports.search_s_list_keyboard = (ctx, data, offset) => {
  const keyboard = inlineKeyboard(
    data.map(({ what_need, send_from, send_to, date_start, date_finish, id }) =>
      callbackButton(
        `${
          what_need === "send" ? "📦" : "🧳"
        } ${send_from}->${send_to} c ${moment(date_start).format(
          "DD.MM.YY"
        )} по ${moment(date_finish).format("DD.MM.YY")}`,
        `item-${id}`
      )
    ),
    { columns: 1 }
  );

  const b = [];

  if (offset > 0)
    b.push(
      callbackButton(
        ctx.getTitle("BUTTON_PREVIOUS"),
        `get_a_${Number(offset) - 1}`
      )
    );

  b.push(
    callbackButton(ctx.getTitle("BUTTON_NEXT"), `get_a_${Number(offset) + 1}`)
  );

  keyboard.reply_markup.inline_keyboard.push(b);

  keyboard.reply_markup.inline_keyboard.push([
    callbackButton(ctx.getTitle("BUTTON_GO_BACK"), "go_back"),
  ]);

  return keyboard;
};

exports.search_no_items = (ctx, isSubscribed, backScene) => {
  const keyboard = inlineKeyboard([
    isSubscribed
      ? callbackButton(ctx.getTitle("BUTTON_UNSUBSCRIBE"), `unsubscribe`)
      : callbackButton(ctx.getTitle("BUTTON_SUBSCRIBE"), `subscribe`),
  ]);

  if (backScene)
    keyboard.reply_markup.inline_keyboard.push([
      callbackButton(ctx.getTitle("BUTTON_GO_BACK"), "go_back_scene"),
    ]);

  return keyboard;
};

exports.search_list_keyboard = (
  ctx,
  data,
  prefix,
  cardId,
  offset,
  from,
  isSubscribed,
  backScene
) => {
  const keyboard = inlineKeyboard(
    data.map(
      ({
        name,
        send_from,
        send_to,
        departure_date,
        departure_date_back,
        what_need,
        description,
        comment,
        status,
        id,
      }) =>
        callbackButton(
          what_need === "delivery"
            ? `${moment(
                from === send_from ? departure_date : departure_date_back
              ).format("DD.MM.YYYY")} ${
                status === "reliable"
                  ? "🟢"
                  : status === "regular"
                  ? "🟡"
                  : status === "user"
                  ? "🟠"
                  : status === "newbie"
                  ? "🔴"
                  : "БАН"
              } ${comment ?? " "}`
            : `${send_from}->${send_to} c ${moment(departure_date).format(
                "DD.MM.YY"
              )} по ${moment(departure_date_back).format("DD.MM.YY")} ${
                status === "reliable"
                  ? "🟢"
                  : status === "regular"
                  ? "🟡"
                  : status === "user"
                  ? "🟠"
                  : status === "newbie"
                  ? "🔴"
                  : "БАН"
              } ${comment ?? " "}`,
          prefix + "-" + id
        )
    ),
    { columns: 1 }
  );

  const p2 =
    prefix === "item" ? "category" : prefix === "subcategory" ? "category" : "";

  if (prefix === "item" && p2) {
    const b = [];

    if (offset > 0)
      b.push(
        callbackButton(
          ctx.getTitle("BUTTON_PREVIOUS"),
          `get_${cardId}_${Number(offset) - 1}`
        )
      );

    b.push(
      callbackButton(
        ctx.getTitle("BUTTON_NEXT"),
        `get_${cardId}_${Number(offset) + 1}`
      )
    );

    keyboard.reply_markup.inline_keyboard.push(b);
  }

  keyboard.reply_markup.inline_keyboard.push([
    isSubscribed
      ? callbackButton(ctx.getTitle("BUTTON_UNSUBSCRIBE"), `unsubscribe`)
      : callbackButton(ctx.getTitle("BUTTON_SUBSCRIBE"), `subscribe`),
  ]);

  if (backScene)
    keyboard.reply_markup.inline_keyboard.push([
      callbackButton(ctx.getTitle("BUTTON_GO_BACK"), "go_back_scene"),
    ]);

  return keyboard;
};

exports.appointments_list_keyboard = (
  ctx,
  data,
  prefix,
  cardId,
  offset,
  subscribeBtn
) => {
  const keyboard = inlineKeyboard(
    data.map(({ name, send_from, send_to, id }) =>
      callbackButton(
        `Заявка №${id}: ${send_from} - ${send_to}`,
        prefix + "-" + id
      )
    ),
    { columns: 1 }
  );

  const p2 =
    prefix === "item" ? "category" : prefix === "subcategory" ? "category" : "";

  console.log(1, p2);

  if (prefix === "item" && p2) {
    const b = [];

    if (offset > 0)
      b.push(
        callbackButton(
          ctx.getTitle("BUTTON_PREVIOUS"),
          `get_${cardId}_${Number(offset) - 1}`
        )
      );

    b.push(
      callbackButton(
        ctx.getTitle("BUTTON_NEXT"),
        `get_${cardId}_${Number(offset) + 1}`
      )
    );

    keyboard.reply_markup.inline_keyboard.push(b);
  }

  if (subscribeBtn)
    keyboard.reply_markup.inline_keyboard.push([
      callbackButton(ctx.getTitle("BUTTON_SUBSCRIBE"), `subscribe`),
    ]);

  return keyboard;
};

exports.user_actions_keyboard = (ctx, id) =>
  inlineKeyboard([
    [callbackButton("Сделать надежным", "status_reliable_" + id)],
    [callbackButton("По кол. объявлений", "status_count_" + id)],
    [callbackButton("Забанить", "status_restricted_" + id)],
  ]);

exports.password_actions_keyboard = (ctx) =>
  inlineKeyboard([callbackButton("Сменить пароль", "change_password")]);

exports.new_appointment_keyboard = (ctx) =>
  inlineKeyboard(
    [callbackButton("Заполнить новую заявку", "new_appointment")],
    {
      columns: 1,
    }
  );

exports.finish_send_keyboard = (ctx) =>
  inlineKeyboard(
    [
      callbackButton("Отправить объявление", "send"),
      callbackButton("Изменить поле имя", "name"),
      //callbackButton("Изменить контакты", "contacts"),
      callbackButton("Изменить поле откуда", "send_from"),
      callbackButton("Изменить поле куда", "send_to"),
      callbackButton("Изменить описание", "description"),
      callbackButton("Изменить комментарий", "comment"),
    ],
    { columns: 1 }
  );

exports.finish_delivery_keyboard = (ctx) =>
  inlineKeyboard(
    [
      callbackButton("Отправить объявление", "send"),
      callbackButton("Изменить поле имя", "name"),
      //callbackButton("Изменить контакты", "contacts"),
      callbackButton("Изменить поле откуда", "send_from"),
      callbackButton("Изменить поле куда", "send_to"),
      callbackButton("Изменить дату отправления", "departure_date"),
      callbackButton("Изменить дату возвращения", "departure_date_back"),
      callbackButton("Изменить комментарий", "comment_delivery"),
    ],
    { columns: 1 }
  );

exports.finish_updating_keyboard = (ctx, what_need) =>
  what_need === "send"
    ? inlineKeyboard(
        [
          callbackButton("Сохранить изменения", "send"),
          callbackButton("Изменить поле имя", "name"),
          callbackButton("Изменить г. отпр.", "send_from"),
          callbackButton("Изменить г. приб.", "send_to"),
          callbackButton("Изменить параметры груза", "description"),
          callbackButton("Изменить комментарий", "comment"),
        ],
        { columns: 1 }
      )
    : inlineKeyboard(
        [
          callbackButton("Сохранить изменения", "send"),
          callbackButton("Изменить поле имя", "name"),
          callbackButton("Изменить г. отпр.", "send_from"),
          callbackButton("Изменить г. приб.", "send_to"),
          callbackButton("Изменить дату вылета", "departure_date"),
          callbackButton("Изменить дату возвращения", "departure_date_back"),
          callbackButton("Изменить комментарий", "comment"),
        ],
        { columns: 1 }
      );

exports.update_keyboard = (ctx) => {
  const keyboard = inlineKeyboard(
    [callbackButton(ctx.getTitle("UPDATE_BUTTON"), "reload")],
    { columns: 1 }
  );

  return keyboard;
};

exports.categories_list_admin_keyboard = (
  ctx,
  data,
  prefix,
  cardId,
  offset
) => {
  const keyboard = inlineKeyboard(
    data.map(({ username, id, customer_id, what_need, name }) =>
      callbackButton(
        `Заявка №${id + (what_need === "send" ? " 📦" : " 🧳")} от ${
          name ?? username ?? customer_id
        }`,
        prefix + "-" + id
      )
    ),
    { columns: 1 }
  );

  const p2 =
    prefix === "item" ? "category" : prefix === "subcategory" ? "category" : "";

  console.log(1, p2);

  if (prefix === "item" && !p2)
    keyboard.reply_markup.inline_keyboard.push([
      callbackButton(ctx.getTitle("BUTTON_EDIT"), `edit-${p2}-${cardId}`),
      callbackButton(ctx.getTitle("BUTTON_DELETE"), `delete-${p2}-${cardId}`),
    ]);

  if (prefix === "item" && p2) {
    const b = [];

    if (offset > 0)
      b.push(
        callbackButton(
          ctx.getTitle("BUTTON_PREVIOUS"),
          `get_${cardId}_${Number(offset) - 1}`
        )
      );

    b.push(
      callbackButton(
        ctx.getTitle("BUTTON_NEXT"),
        `get_${cardId}_${Number(offset) + 1}`
      )
    );

    keyboard.reply_markup.inline_keyboard.push(b);
  }

  return keyboard;
};

exports.admins_actions_keyboard = (ctx) => {
  const keyboard = inlineKeyboard(
    [
      callbackButton(ctx.getTitle("BUTTON_ADD_ADMIN"), "addAdmin"),
      callbackButton(ctx.getTitle("BUTTON_DELETE_ADMIN"), "deleteAdmin"),
    ],
    { columns: 2 }
  );

  return keyboard;
};

exports.change_text_actions_keyboard = (ctx) => {
  const keyboard = inlineKeyboard(
    [
      callbackButton("GREETING", "GREETING"),
      //callbackButton(ctx.getTitle("BUTTON_CHANGE_PHOTO"), "change_photo"),
    ],
    { columns: 1 }
  );

  return keyboard;
};

exports.admins_list_keyboard = (ctx, admins) => {
  const keyboard = inlineKeyboard(
    admins.map(({ user_id }) => callbackButton(user_id, "admin-" + user_id)),
    { columns: 2 }
  );

  return keyboard;
};

exports.add_delete_keyboard = (ctx) => {
  const keyboard = inlineKeyboard(
    [callbackButton("ADD", "add"), callbackButton("DELETE", "delete")],
    { columns: 2 }
  );

  return keyboard;
};

exports.skip_keyboard = (ctx) => this.custom_keyboard(ctx, ["SKIP"], ["skip"]);

exports.skip_previous_keyboard = (ctx) =>
  inlineKeyboard(
    [
      callbackButton(ctx.getTitle("BUTTON_PREVIOUS"), "previous_step"),
      callbackButton(ctx.getTitle("BUTTON_SKIP"), "skip"),
    ],
    { columns: 2 }
  );

exports.confirm_cancel_keyboard = (ctx) =>
  inlineKeyboard(
    [
      callbackButton(ctx.getTitle("BUTTON_CONFIRM"), "confirm"),
      callbackButton(ctx.getTitle("BUTTON_CANCEL"), "cancel"),
    ],
    { columns: 1 }
  );

exports.wa_keyboard = (ctx, id) => {
  const keyboard = inlineKeyboard(
    [
      callbackButton(ctx.getTitle("APROOVE_BUTTON"), "aproove-" + id),
      callbackButton(ctx.getTitle("REJECT_BUTTON"), "reject-" + id),
      callbackButton(ctx.getTitle("EDIT_BUTTON"), "edit-" + id),
    ],
    { columns: 2 }
  );

  return keyboard;
};

exports.go_back_keyboard = (ctx) =>
  inlineKeyboard([callbackButton(ctx.getTitle("BUTTON_GO_BACK"), "go_back")]);

exports.skip_keyboard = (ctx) =>
  inlineKeyboard([callbackButton(ctx.getTitle("BUTTON_SKIP"), "skip")]);

exports.cancel_keyboard = (ctx) =>
  inlineKeyboard([callbackButton(ctx.getTitle("BUTTON_CANCEL"), "cancel")]);

exports.confirm_keyboard = (ctx) =>
  inlineKeyboard([callbackButton(ctx.getTitle("BUTTON_CONFIRM"), "confirm")]);
