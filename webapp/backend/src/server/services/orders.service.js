const tOrmCon = require("../../db/connection");
const {
  HttpError,
  MySqlError,
  NotFoundError,
  NoInputDataError,
} = require("../utils/httpErrors");
require("dotenv").config();

const Robokassa = require("../utils/robokassa");
const moment = require("moment");
class UsersService {
  constructor() {
    this.getOne = this.getOne.bind(this);
    this.getAll = this.getAll.bind(this);
    this.dropItem = this.dropItem.bind(this);
  }

  getOne({ id }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      connection
        .query(
          `SELECT o.*,count(oi.item_option_id) count_items, u.username,p.type promo_type, p.sum promo_sum,
          json_agg(json_build_object(
            'title', i.title,'count',oi.count, 'id', io.id, 'item_id', i.id, 'size', io.size, 'material', io.material, 'price', io.price,'mainside_id', oi.mainside_id
            )) items
          from orders o 
          left join order_items oi on o.id = oi.order_id  
          left join item_options io on oi.item_option_id = io.id  
          left join items i on io.item_id = i.id  
          left join users u on o.user_id = u.id
          left join promos p on p.code = o.promo_code
          where o.id = $1
          group by o.id, u.username, p.code
          limit 1`,
          [id]
        )
        .then(async (postData) => {
          if (!postData?.[0]) rej(new NotFoundError());

          return res(postData?.[0]);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  getAll({ id, page = 1, take = 10, isBasket, user_id }) {
    return new Promise(async (res, rej) => {
      if (id) {
        this.getOne({ id })
          .then((data) => res(data))
          .catch((error) => rej(error));
      }

      const skip = (page - 1) * take;

      const connection = await tOrmCon;

      connection
        .query(
          `SELECT o.*,
          json_agg(DISTINCT jsonb_build_object('title', i.title,'count',oi.count, 
           'material',  io.material, 'size', io.size, 'price', io.price)) items 
          from orders o 
          left join order_items oi on o.id = oi.order_id  
          left join item_options io on oi.item_option_id = io.id  
          left join items i on io.item_id = i.id 
          where (user_id = $3 or $3 is NULL)  
          ${isBasket ? "" : `and status <> 'basket'`}
          GROUP BY o.id
          ORDER BY status, o.id DESC
          LIMIT $1 OFFSET $2`,
          [take, skip, user_id]
        )
        .then(async (data) => {
          return res(data);
        })
        .catch((error) => {
          console.log(error);
          rej(new MySqlError(error));
        });
    });
  }

  add(
    {
      user_id,
      address,
      selected_dm,
      selected_po,
      phone,
      name,
      surname,
      patronymic,
      postal_code,
      promo_code,
      delivery_price,
      comment,
    },
    ctx
  ) {
    return new Promise(async (res, rej) => {
      if (!user_id) return rej(new NoInputDataError({ user_id }));

      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const basket = (
          await queryRunner.query(
            `select o.*, count(oi.item_option_id) count_items,
          individual_price,individual_text,
          json_agg(json_build_object('title', i.title,'category', i.category_name,'count',oi.count, 'id', io.id, 'size', io.size, 'material', io.material, 'price', io.price)) items 
          from orders o 
          left join order_items oi on o.id = oi.order_id  
          left join item_options io on oi.item_option_id = io.id  
          left join items i on io.item_id = i.id 
          where user_id = $1 and status='basket' 
          group by o.id
          limit 1`,
            [user_id]
          )
        )[0];
        if (basket.count_items < 1 && !basket.individual_price)
          throw new Error("No items");

        const basket_id = basket.id;

        let type,
          sum = 0;

        if (promo_code) {
          const promoObj =
            (
              await connection
                .query("select * from promos where code = $1 limit 1", [
                  promo_code,
                ])
                .catch((e) => {
                  console.log(e);
                  ctx.replyWithTitle("DB_ERROR");
                })
            )?.[0] ?? {};

          sum = promoObj.sum;
          type = promoObj.type;
          const maxCount = promoObj.count;

          if (!sum) return rej(new Error("WRONG_PROMO"));

          const count_used = (
            await queryRunner.query(
              "select count(*) count_used from users_promos where promo_code = $1",
              [promo_code]
            )
          )[0].count_used;

          console.log(maxCount, count_used);

          if (maxCount <= count_used) throw new Error("PROMO_USED");

          await queryRunner.query(
            "insert into users_promos (user_id, promo_code, used, use_date) values ($1,$2,true, now())",
            [user_id, promo_code]
          );
        }

        let total = basket.items.reduce(
          (prev, cur) => prev + cur.price * cur.count,
          0
        );
        total =
          type === "money"
            ? Math.max(total - sum, 0)
            : ((+(100 - sum) * total) / 100).toFixed(0);

        if (total < 0) throw new Error("PROMO_TO_LARGE");
        if (delivery_price < 0) throw new Error("DELIVERY_WRONG");

        total = +total + +delivery_price;

        total = total + (basket.individual_price ?? 0);

        const data = await queryRunner.manager.getRepository("Order").save({
          user_id,
          total,
          selected_dm,
          selected_po,
          phone,
          address,
          name,
          surname,
          postal_code,
          promo_code,
          patronymic,
          comment,
          individual_price: basket.individual_price,
          individual_text: basket.individual_text,
        });

        const { id: order_id } = data;

        await queryRunner.query(
          `update orders set individual_price=null,individual_text=null where id = $1`,
          [basket_id]
        );

        await queryRunner.query(
          `update order_items set order_id=$1 where order_id = $2`,
          [order_id, basket_id]
        );

        await queryRunner.query(
          `update users set address=$2,phone=$3,name=$4,surname=$5,patronymic=$6,postal_code=$7 where id = $1`,
          [user_id, address, phone, name, surname, patronymic, postal_code]
        );

        await queryRunner.commitTransaction();
        global.io.emit("UPDATE_ORDERS");
        res(data);

        let orderStr =
          basket.items
            ?.map((el) =>
              el.id ? `📦 ${el.category} ${el.title} - ${el.count} (шт.)` : ""
            )
            ?.join("\n") ?? "";
        orderStr =
          orderStr +
          (orderStr && basket.individual_text ? "\n" : "") +
          (basket.individual_text ?? "");

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
          items: basket.items?.map((el) => {
            const p = /[^a-zA-Zа-яА-Я0-9]+/g;
            return {
              name: `${el.category?.replace(p, "")} ${el.title?.replace(
                p,
                ""
              )}`,
              cost: el.price,
              sum: makeSale(el.price * el.count, type, sum),
              quantity: el.count,
              payment_method: "full_payment",
              tax: "none",
            };
          }),
        };

        const link = await robokassa
          .getInvoiceLink({
            OutSum: total,
            InvId: order_id,
            Reciept: reciept,
          })
          .catch(console.log);

        ctx.telegram
          .sendMessage(
            user_id,
            ctx.getTitle("ORDER_INFO_TITLE", [
              order_id,
              moment(basket.creation_date).format("DD.MM.YYYY"),
              orderStr,
              "Новый",
              selected_dm,
              total,
            ]),
            {
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Оплатить",
                      url: link,
                    },
                  ],
                ],
              },
            }
          )
          .catch(console.log);
      } catch (error) {
        console.log(error);
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  delete(id) {
    return new Promise((res, rej) => {
      if (!id) return rej(new NoInputDataError({ id: id }));

      tOrmCon.then((connection) => {
        connection
          .getRepository("Order")
          .delete({ id })
          .then((data) => res(data))
          .catch((error) => rej(new MySqlError(error)));
      });
    });
  }

  editItem({ order_id, item_option_id, count, mainside_id }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      if (!!mainside_id) return rej(new Error("Cant drop relative item"));

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        let data;
        if (count < 1) {
          data = await queryRunner.query(
            `delete from order_items where order_id=$1 and ((item_option_id=$2 and is_backside = false) or mainside_id=$2);`,
            [order_id, item_option_id]
          );
        } else if (count > 100) throw new Error();
        else
          data = await queryRunner.query(
            `update order_items set count = $3 where order_id=$1 and ((item_option_id=$2 and is_backside = false) or mainside_id=$2);`,
            [order_id, item_option_id, count]
          );

        await queryRunner.commitTransaction();

        res(data);
      } catch (error) {
        console.log(error);
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  dropItem({ item_option_id, order_id, mainside_id }) {
    return new Promise((res, rej) => {
      if (!item_option_id || !order_id)
        return rej(
          new NoInputDataError({ item_option_id, order_id, mainside_id })
        );

      tOrmCon.then((connection) => {
        connection
          .query(
            `delete from order_items 
        where order_id=$1 and (item_option_id=$2 or mainside_id=$2 or $2 is NULL) and (mainside_id = $3 or $3 is NULL)`,
            [order_id, item_option_id, mainside_id]
          )
          .then((data) => res(data))
          .catch((error) => rej(new MySqlError(error)));
      });
    });
  }

  edit(order, ctx) {
    return new Promise((res, rej) => {
      if (!order.id) return rej(new NoInputDataError({ id: order.id }));

      tOrmCon.then((connection) => {
        connection
          .query("update orders set status = $1 where id = $2 returning *", [
            order.status,
            order.id,
          ])
          .then((data) => {
            const orderObj = data[0][0];
            ctx.telegram
              .sendMessage(
                orderObj.user_id,
                ctx.getTitle("ORDER_NEW_STATUS_TITLE", [
                  orderObj.id,
                  moment(orderObj.creation_date).format("DD.MM.YYYY"),
                  orderObj.status,
                ]),
                {
                  parse_mode: "HTML",
                }
              )
              .catch(console.log);

            res(data);
          })
          .catch((error) => rej(new MySqlError(error)));
      });
    });
  }
}

module.exports = new UsersService();
