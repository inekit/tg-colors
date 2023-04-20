const {
  CustomWizardScene,
  createKeyboard,
  handlers: { FilesHandler },
  telegraf: { Markup },
} = require("telegraf-steps");
const moment = require("moment");
const Robokassa = require("../../server/utils/robokassa");

const scene = new CustomWizardScene("ordersScene");

const tOrmCon = require("../../db/connection");

async function getOrders(userId) {
  const connection = await tOrmCon;

  return await connection
    .query(
      `select id, creation_date, status
      from orders where user_id = $1 limit 20`,
      [userId]
    )
    .catch((e) => {
      console.log(e);
    });
}

scene.enter(async (ctx) => {
  const { edit } = ctx.scene.state;

  ctx.scene.state.orders = await getOrders(ctx.from.id);
  let keyboard = {
    name: "orders_list_keyboard",
    args: [ctx.scene.state.orders],
  };
  let title = ctx.getTitle("CHOOSE_ORDER");
  if (!ctx.scene.state.orders?.length) {
    return await ctx.replyWithTitle("NO_ORDERS_ADDED");
  }

  if (edit) return ctx.editMenu(title, keyboard);

  await ctx.replyWithKeyboard("⚙️", "main_menu_back_keyboard");
  ctx.replyWithKeyboard(title, keyboard);
});

scene.action(/^order\-([0-9]+)$/g, async (ctx) => {
  ctx.answerCbQuery().catch(console.log);
  const order_id = ctx.match[1];

  const connection = await tOrmCon;

  const order = (
    await connection.query(
      `select o.*, 
    json_agg(DISTINCT jsonb_build_object('title', i.title,'count',oi.count, 'id', io.id, 'size', io.size, 'material', io.material, 'price', io.price)) items 
    from orders o 
    left join order_items oi on o.id = oi.order_id  
    left join item_options io on oi.item_option_id = io.id  
    left join items i on io.item_id = i.id 
    where o.id = $1
    group by o.id
    limit 1`,
      [order_id]
    )
  )?.[0];

  const orderStr = order.items
    ?.map((el) => `📦 ${el.title} - ${el.count} (шт.)`)
    ?.join("/n");

  const orderInfoParams = [
    order_id,
    moment(order.creation_date).format("DD.MM.YYYY"),
    orderStr,
    order.status,
    order.selected_po,
    order.selected_dm,
    order.total,
  ];

  if (order.status === "Новый") {
    const robokassa = new Robokassa({
      MerchantLogin: "",
      Password: "",
    });

    const link = await robokassa
      .getInvoiceLink({
        OutSum: 100,
        InvId: 1,
        Description: "Описание",
      })
      .catch(console.log);

    ctx.editMenu(
      "ORDER_INFO_TITLE",
      { name: "payment_keyboard", args: [link] },
      orderInfoParams
    );
  } else if (order.status === "basket") {
    const total = order.items?.reduce((prev, cur) => prev + cur.price, 0) ?? 0;
    ctx.editMenu("BASKET_INFO_TITLE", "go_back_keyboard", [orderStr, total]);
  } else ctx.editMenu("ORDER_INFO_TITLE", "go_back_keyboard", orderInfoParams);
});

scene.action("go_back", async (ctx) => {
  ctx.answerCbQuery().catch(console.log);

  ctx.scene.enter("ordersScene", { edit: true });
});

module.exports = scene;
