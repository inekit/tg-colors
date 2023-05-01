const tOrmCon = require("../../db/connection");
const checkInputData = require("../utils/checkInputData");
const {
  HttpError,
  MySqlError,
  NotFoundError,
  NoInputDataError,
} = require("../utils/httpErrors");
const webp = require("webp-converter");
webp.grant_permission();
const fs = require("fs").promises;

class UsersService {
  constructor() {
    this.get = this.get.bind(this);
    this.edit = this.edit.bind(this);
  }

  get({}) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      connection
        .query(
          `select size, material, is_backside, min(price) price, max(price) max_price
              from public.items p
              left join item_options io on p.id = io.item_id
              group by size, material, is_backside`
        )
        .then((data) => res(data))
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  edit({
    id,
    title,
    categoryName,
    description,
    images,
    previewsBinary,
    optionsObject,
    optionsObjectBackside,
  }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const data = await queryRunner.manager
          .getRepository("Item")
          .createQueryBuilder()
          .update({
            title,
            category_name: categoryName ?? null,
            description,
          })
          .where({
            id: id,
          })
          .returning("*")
          .execute();

        await queryRunner.query("delete from item_options where item_id = $1", [
          id,
        ]);

        const oo = optionsObject && JSON.parse(optionsObject);
        for (let m in oo) {
          const sizes = oo[m];
          for (let s in sizes) {
            const price = sizes[s];
            console.log(s, m, price);
            if (price)
              await queryRunner.query(
                "insert into item_options (item_id,size,material,price,is_backside) values ($1,$2,$3,$4, false)",
                [id, s, m, price]
              );
          }
        }
        const oob = optionsObjectBackside && JSON.parse(optionsObjectBackside);
        for (let m in oob) {
          const sizes = oob[m];
          for (let s in sizes) {
            const price = sizes[s];
            if (price)
              await queryRunner.query(
                "insert into item_options (item_id,size,material,price, is_backside) values ($1,$2,$3,$4,true)",
                [id, s, m, price]
              );
          }
        }

        await queryRunner.commitTransaction();

        res(data);
      } catch (error) {
        await queryRunner.rollbackTransaction();

        console.log(error);
        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }
}

module.exports = new UsersService();
