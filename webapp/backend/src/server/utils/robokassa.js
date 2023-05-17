const axios = require("axios");
const crypto = require("crypto");

class Robokassa {
  constructor({ MerchantLogin, Password }) {
    this.MerchantLogin = MerchantLogin;
    this.Password = Password;
  }
  async getInvoiceLink({ OutSum, InvId, Description }) {
    //console.log(encodeURI(JSON.stringify(Reciept)),encodeURI() Reciept);

    const Reciept = {
      sno: "osn",
      items: [
        {
          name: "Название товара 1",
          quantity: 1,
          sum: 100,
          payment_method: "full_payment",
          payment_object: "commodity",
          tax: "vat10",
        },
        {
          name: "Название товара 2",
          quantity: 3,
          sum: 450,
          cost: 150,
          payment_method: "full_prepayment",
          payment_object: "service",
          nomenclature_code: "04620034587217",
        },
      ],
    };
    const signature = crypto
      .createHash("md5")
      .update(
        `${this.MerchantLogin}:${OutSum}:${InvId}:${encodeURI(
          JSON.stringify(Reciept)
        )}:${this.Password}`
      )
      .digest("hex");

    console.log(signature);

    return new Promise((resolve, reject) => {
      axios
        .post(`https://auth.robokassa.ru/Merchant/Indexjson.aspx?`, null, {
          params: {
            MerchantLogin: this.MerchantLogin,
            OutSum,
            InvId,
            Reciept: Reciept,
            Description,
            SignatureValue: signature,
            Culture: "ru",
          },
        })
        .then((response) => {
          console.log(response.data);
          resolve(
            `https://auth.robokassa.ru/Merchant/Index/${response.data?.invoiceID}`
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Robokassa;
