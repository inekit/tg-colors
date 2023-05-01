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
          `select size, material, is_backside, min(price) min_price, max(price) max_price
              from public.items p
              left join item_options io on p.id = io.item_id
              group by size, material, is_backside`
        )
        .then((data) => res(data))
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  edit(edited_array) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        for (let { size, material, is_backside, price } of JSON.parse(
          edited_array
        )) {
          if (!price) continue;

          await connection.query(
            "update item_options set price = $1 where size = $2 and material = $3 and is_backside = $4",
            [price, size, material, is_backside]
          );
        }
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
}

module.exports = new UsersService();
