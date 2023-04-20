const axios = require("axios");
const crypto = require("crypto");

class Robokassa {
  constructor({ MerchantLogin, Password }) {
    this.MerchantLogin = MerchantLogin;
    this.Password = Password;
  }
  async getInvoiceLink({ OutSum, InvId, Description }) {
    const signature = crypto
      .createHash("md5")
      .update(`${this.MerchantLogin}:${OutSum}:${InvId}:${this.Password}`)
      .digest("hex");

    return new Promise((resolve, reject) => {
      axios
        .post(`https://auth.robokassa.ru/Merchant/Indexjson.aspx?`, null, {
          params: {
            MerchantLogin: this.MerchantLogin,
            OutSum,
            InvId,
            Description,
            SignatureValue: signature,
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
