const axios = require("axios");
const crypto = require("crypto");

class Robokassa {
  constructor({ MerchantLogin, Password }) {
    this.MerchantLogin = MerchantLogin;
    this.Password = Password;
  }
  async getInvoiceLink({ OutSum, InvId, Description, Receipt }) {
    //console.log(encodeURI(JSON.stringify(Reciept)),encodeURI() Reciept);

    const signature = crypto
      .createHash("md5")
      .update(
        `${this.MerchantLogin}:${OutSum}:${InvId}:${encodeURI(
          JSON.stringify(Receipt)
        )}:${this.Password}`
      )
      .digest("hex");

    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://auth.robokassa.ru/Merchant/Indexjson.aspx`,
          {
            MerchantLogin: this.MerchantLogin,
            OutSum: OutSum,
            invoiceID: InvId,
            Receipt: encodeURI(JSON.stringify(Receipt)),
            SignatureValue: signature,
            Culture: "ru",
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((response) => {
          //console.log(response);
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
