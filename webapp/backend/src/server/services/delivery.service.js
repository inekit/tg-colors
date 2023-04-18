const tOrmCon = require("../../db/connection");
const checkInputData = require("../utils/checkInputData");
const Cdek = require("../utils/cdek");
const Ya = require("../utils/ya");

const {
  HttpError,
  MySqlError,
  NotFoundError,
  NoInputDataError,
} = require("../utils/httpErrors");

class BasketsService {
  constructor() {
    this.getPrice = this.getPrice.bind(this);
  }

  getPrice({ operator, address, count }) {
    return new Promise(async (res, rej) => {
      try {
        if (operator === "сдек") {
          const cdek = new Cdek({
            mode: process.env.MODE,
            client_id: "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
            client_secret: "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG",
          });

          await cdek.auth();
          const result = await cdek.getPrice({
            tariff_code: 136,
            from_location: { postal_code: "603065" },
            to_location: { address: "Дубна" },
            packages: [
              {
                weight: 1000,
                length: 50,
                width: 50,
                height: 50,
              },
            ],
          });

          console.log(result);

          res(result);
        } else if (operator === "Яндекс") {
          const ya = new Ya({
            access_token:
              "y2_AgAAAAD0Wcn4AAAPeAAAAAACJXtV-u9qs8IzQzWzJ0Cdt9pv-Wh1YS8",
          });
          const result = await ya.getPrice({
            address: "Дубна",
            total_weight: 1000,
          });
          console.log(result);
          res(result);
        }
      } catch (error) {
        rej(error);
      }
    });
  }
}

module.exports = new BasketsService();
