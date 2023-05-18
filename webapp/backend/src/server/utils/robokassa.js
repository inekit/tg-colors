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
      items: [{ name: "название", quantity: 1, sum: 1, tax: "none" }],
    };

    const signature = crypto
      .createHash("md5")
      .update(
        `${this.MerchantLogin}:${OutSum}:${InvId}:${encodeURI(
          JSON.stringify(Reciept)
        )}:${this.Password}`
      )
      .digest("hex");

    console.log(
      `${this.MerchantLogin}:${OutSum}:${InvId}:${encodeURI(
        JSON.stringify(Reciept)
      )}:${this.Password}`
    );

    return new Promise((resolve, reject) => {
      axios
        .post(`https://auth.robokassa.ru/Merchant/Index.aspx`, null, {
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
