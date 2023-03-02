const tOrmCon = require("../../db/connection");
const {
  HttpError,
  MySqlError,
  NotFoundError,
  NoInputDataError,
} = require("../utils/httpErrors");

class UsersService {
  constructor() {
    this.getOne = this.getOne.bind(this);

    this.getFavorites = this.getFavorites.bind(this);

    this.getAll = this.getAll.bind(this);
    this.sendFiles = this.sendFiles.bind(this);
  }

  getOne(id) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      connection
        .query(`select * from items where id = $1`, [id])
        .then(async (postData) => {
          if (!postData?.[0]) rej(new NotFoundError());

          return res(postData?.[0]);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  getFavorites({ id, page = 1, take = 10, searchQuery, distinct }, ctx) {
    return new Promise(async (res, rej) => {
      const skip = (page - 1) * take;

      const connection = await tOrmCon;

      if (!searchQuery) searchQuery = undefined;
      else searchQuery = `%${searchQuery}%`;

      connection
        .query(
          `select * from favorites f left join items i on f.item_id = i.id
          where (
            lower(name) like lower($1) 
            or lower(company_name) like lower($1)
            or lower(city_name) like lower($1)
            or lower(developer_name) like lower($1)
            or lower(declaration) like lower($1)
            or lower(address) like lower($1)
            or lower(material) like lower($1)
            or lower(finish_type) like lower($1)
            or lower(description) like lower($1)
            or lower(metro_1) like lower($1)
            or lower(metro_2) like lower($1)
            or lower(metro_3) like lower($1)
            or $1 is NULL
            )
          LIMIT $2 OFFSET $3 order by id`,
          [searchQuery, take, skip]
        )
        .then(async (data) => {
          return res(data);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  getAll(
    {
      id,
      page = 1,
      take = 10,
      property_class,
      sale_percent_min,
      sale_percent_max,
      commissioning_year,
      meter_price_min,
      meter_price_max,
      searchQuery,
      distinct,
    },
    ctx
  ) {
    return new Promise(async (res, rej) => {
      if (id) {
        this.getOne(id)
          .then((data) => res(data))
          .catch((error) => rej(error));
      }

      const skip = (page - 1) * take;

      const connection = await tOrmCon;

      if (!searchQuery) searchQuery = undefined;
      else searchQuery = `%${searchQuery}%`;

      const querySubstr1 = distinct
        ? "SELECT DISTINCT ON (declaration)id, * FROM items"
        : "select * from items";
      const querySubstr2 = distinct
        ? "ORDER BY declaration DESC, id;"
        : "order by id";

      connection
        .query(
          `${querySubstr1} 
          where (property_class = $1 or $1 is NULL)
          and ((sale_percent > $2 or $2 is NULL) and (sale_percent < $3 or $3 is NULL)) 
          and (commissioning_year = $4 or $4 is NULL)
          and ((meter_price > $5 or $5 is NULL) and (meter_price < $6 or $6 is NULL))
          and (
            lower(name) like lower($7) 
            or lower(company_name) like lower($7)
            or lower(city_name) like lower($7)
            or lower(developer_name) like lower($7)
            or lower(declaration) like lower($7)
            or lower(address) like lower($7)
            or lower(material) like lower($7)
            or lower(finish_type) like lower($7)
            or lower(description) like lower($7)
            or lower(metro_1) like lower($7)
            or lower(metro_2) like lower($7)
            or lower(metro_3) like lower($7)
            or $7 is NULL
            )
          LIMIT $8 OFFSET $9 ${querySubstr2}`,
          [
            property_class,
            sale_percent_min,
            sale_percent_max,
            commissioning_year,
            meter_price_min,
            meter_price_max,
            searchQuery,
            take,
            skip,
          ]
        )
        .then(async (data) => {
          return res(data);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  sendFiles({ user_id, item_id }, ctx) {
    return new Promise((res, rej) => {
      ctx.telegram
        .sendMessage(user_id, ctx.getTitle("ITEM_INFO_TITLE"), {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Получить бесплатную консультацию",
                  callback_data: "consult-" + item_id,
                },
              ],
              [{ text: "Cкачать ПД", callback_data: "pd-" + item_id }],
              [
                {
                  text: "Скачать презентацию",
                  callback_data: "presentation-" + item_id,
                },
              ],
            ],
          },
        })
        .catch(console.log);
      res();
    });
  }
}

module.exports = new UsersService();
