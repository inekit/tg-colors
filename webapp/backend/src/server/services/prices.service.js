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

  edit({ size, material, is_backside, price }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      if (!price) rej("Null price");

      await connection
        .query(
          "update item_options set price = $1 where size = $2 and material = $3 and is_backside = $4",
          [price, size, material, is_backside]
        )
        .then((data) => res(data))
        .catch((error) => rej(new MySqlError(error)));
    });
  }
}

module.exports = new UsersService();
