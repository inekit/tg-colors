const service = require("../services/crud.service").getService("Item", [
  "title",
  "text",
  "description",
]);
const pricesService = require("../services/items.service");

function get(req, res, next) {
  pricesService
    .get(req.query)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

async function edit(req, res, next) {
  pricesService
    .edit(req.body)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

module.exports = {
  get,
  edit,
};
