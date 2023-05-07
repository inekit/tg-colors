const tOrmCon = require("../../db/connection");
const checkInputData = require("../utils/checkInputData");
const {
  HttpError,
  MySqlError,
  NotFoundError,
  NoInputDataError,
} = require("../utils/httpErrors");

class BasketsService {
  constructor() {
    this.getFavorites = this.getFavorites.bind(this);
    this.getBasketData = this.getBasketData.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.editFavorite = this.editFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  addFavorite({
    user_id,
    item_option_id,
    count,
    mainside_id,
    change_individual,
    individual_price,
    individual_text,
  }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      if (change_individual && individual_text && individual_price) {
        const data = await connection.query(
          `update orders set individual_text = $1, individual_price = $2 where user_id = $3 and status='basket'`,
          [individual_text, individual_price, user_id]
        );
        return res(data);
      }

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const orders = await queryRunner.query(
          `select * from orders where user_id = $1::bigint and status='basket' limit 1`,
          [user_id]
        );
        const basket_id = orders[0].id;

        const count_final = mainside_id
          ? (
              await queryRunner.query(
                `select * from order_items where order_id = $1 and item_option_id = $2 and is_backside = false`,
                [basket_id, mainside_id]
              )
            )[0].count
          : count ?? 1;

        const data = await queryRunner
          .query(
            `insert into order_items (order_id, item_option_id, is_backside, mainside_id, count) values ($1,$2,$3,$4,$5)`,
            [basket_id, item_option_id, !!mainside_id, mainside_id, count_final]
          )
          .catch(async (e) => {
            return await queryRunner.query(
              `update order_items set count = $3 where order_id=$1 and item_option_id=$2 and is_backside=$4;`,
              [basket_id, item_option_id, count, !!mainside_id]
            );
          });

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

  editFavorite({ user_id, item_option_id, count }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const orders = await queryRunner.query(
          `select * from orders where user_id = $1::bigint and status='basket' limit 1`,
          [user_id]
        );
        const basket_id = orders[0].id;

        let data;
        if (count < 1) {
          data = await queryRunner.query(
            `delete from order_items where order_id=$1 and ((item_option_id=$2 and is_backside = false) or mainside_id=$2);`,
            [basket_id, item_option_id]
          );
        } else if (count > 100) throw new Error();
        else
          data = await queryRunner.query(
            `update order_items set count = $3 where order_id=$1 and ((item_option_id=$2 and is_backside = false) or mainside_id=$2);`,
            [basket_id, item_option_id, count]
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

  deleteFavorite({ user_id, item_option_id, mainside_id, change_individual }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      if (change_individual) {
        const data = await connection.query(
          `update orders set individual_text = null, individual_price = null where user_id = $1 and status='basket'`,
          [user_id]
        );
        return res(data);
      }

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const orders = await queryRunner.query(
          `select * from orders where user_id = $1 and status='basket' limit 1`,
          [user_id]
        );
        const basket_id = orders[0].id;

        console.log(orders, basket_id, user_id, item_option_id);

        if (!item_option_id && !mainside_id) throw new Error("no data");
        const data = await queryRunner.query(
          `delete from order_items 
          where order_id=$1 and (item_option_id=$2 or mainside_id=$2 or $2 is NULL) and (mainside_id = $3 or $3 is NULL);`,
          [basket_id, item_option_id, mainside_id]
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

  getFavorites({ user_id, item_option_id }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      connection
        .query(
          `select io.id, i.id item_id, o.id order_id, o.creation_date, i.title, i.image_list, count, size, material, price, mainside_id from 
          orders o 
          left join order_items oi on oi.order_id = o.id
          left join item_options io on oi.item_option_id = io.id
          left join items i on io.item_id = i.id
          where o.user_id = $1 and o.status='basket' and io.id is not NULL
          and ((io.id = $2 and oi.is_backside = false) or $2 is NULL)  
          order by io.id`,
          [user_id, item_option_id]
        )
        .then(async (data) => {
          return res(data);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  getBasketData({ user_id, item_option_id }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      connection
        .query(
          `select u.name, u.surname, u.patronymic, u.address, u.phone, u.postal_code, coalesce(sum(io.price * oi.count),0)::int+coalesce(individual_price,0)::int  total, 
          individual_text, individual_price,
          sum(oi.count)::int  total_count,
          json_agg(DISTINCT 
            jsonb_build_object('id', io.id, 'item_id', i.id, 'order_id', o.id, 'creation_date', o.creation_date, 
            'title', i.title, 'image_list', i.image_list, 'count', count, 'size', size, 
            'material', material, 'price', price, 'mainside_id', mainside_id))  favorites
          from users u 
          left join orders o on u.id = o.user_id
          left join order_items oi on oi.order_id = o.id
          left join item_options io on oi.item_option_id = io.id
          left join items i on io.item_id = i.id
          where u.id = $1 and status='basket' 
          and ((io.id = $2 and oi.is_backside = false) or $2 is NULL)  
          group by u.id, o.individual_text, o.individual_price
          limit 1`,
          [user_id, item_option_id]
        )
        .then(async (data) => {
          if (!data?.[0]) rej(new Error(data));

          const basketData = data[0];

          if (!basketData) rej("No basket");

          if (!basketData.favorites[0]?.id) basketData.favorites = [];
          return res(data[0]);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }
}

module.exports = new BasketsService();
