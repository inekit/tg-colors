const {
  CustomWizardScene,
  createKeyboard,
  handlers: { FilesHandler },
  telegraf: { Markup },
} = require("telegraf-steps");
const moment = require("moment");
const Robokassa = require("../../server/utils/robokassa");
require("dotenv").config();
const tOrmCon = require("../../db/connection");

const scene = new CustomWizardScene("ordersScene");

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

  await ctx.replyWithKeyboard("🛒", "main_menu_back_keyboard");
  ctx.replyWithKeyboard(title, keyboard);
});

scene.action(/^order\-([0-9]+)$/g, async (ctx) => {
  ctx.answerCbQuery().catch(console.log);
  const order_id = ctx.match[1];

  const connection = await tOrmCon;

  const order = (
    await connection.query(
      `select o.*, individual_text, individual_price, p.type promo_type, p.sum promo_sum,
    json_agg(DISTINCT jsonb_build_object('title', i.title,'category',i.category_name, 'count',oi.count, 'id', io.id, 'size', io.size, 'material', io.material, 'price', io.price)) items 
    from orders o 
    left join order_items oi on o.id = oi.order_id  
    left join item_options io on oi.item_option_id = io.id  
    left join items i on io.item_id = i.id 
    left join promos p on o.promo_code=p.code
    where o.id = $1
    group by o.id, p.code
    order by o.status, o.id
    limit 1`,
      [order_id]
    )
  )?.[0];

  let orderStr = order.items?.[0].title
    ? order.items?.map((el) => `📦 ${el.title} - ${el.count} (шт.)`)?.join("\n")
    : "";

  orderStr =
    orderStr +
    (orderStr && order.individual_text ? "\n" : "") +
    (order.individual_text ?? "");

  orderStr = orderStr ?? "Нет позиций";

  const orderInfoParams = [
    order_id,
    moment(order.creation_date).format("DD.MM.YYYY"),
    orderStr,
    order.status,
    order.selected_dm,
    order.total,
  ];

  if (order.status === "Новый") {
    const robokassa = new Robokassa({
      MerchantLogin: process.env.ROBO_MERCHANT_LOGIN,
      Password: process.env.ROBO_PASSWORD,
    });

    function makeSale(price, saleType, saleSum) {
      return saleType === "money"
        ? Math.max(price - saleSum, 0)
        : ((+(100 - saleSum) * price) / 100).toFixed(0);
    }
    const reciept = {
      items: order.items?.map((el) => {
        const p = /[^a-zA-Zа-яА-Я0-9]+/g;
        return {
          name: `${el.category} ${el.title}`,
          cost: el.price,
          sum: makeSale(el.price * el.count, order.promo_type, order.promo_sum),
          quantity: el.count,
          payment_method: "full_payment",
          tax: "none",
        };
      }),
    };

    const link = await robokassa
      .getInvoiceLink({
        OutSum: order.total,
        InvId: order_id,
        Reciept: reciept,
      })
      .catch(console.log);

    ctx.editMenu(
      "ORDER_INFO_TITLE",
      { name: "payment_keyboard", args: [link] },
      orderInfoParams
    );
  } else if (order.status === "basket") {
    const total = order.items?.reduce((prev, cur) => prev + cur.price, 0) ?? 0;
    ctx.editMenu(
      "BASKET_INFO_TITLE",
      { name: "basket_keyboard", args: [ctx.from.id] },
      [orderStr, total]
    );
  } else ctx.editMenu("ORDER_INFO_TITLE", "go_back_keyboard", orderInfoParams);
});

scene.action("go_back", async (ctx) => {
  ctx.answerCbQuery().catch(console.log);

  ctx.scene.enter("ordersScene", { edit: true });
});

module.exports = scene;
