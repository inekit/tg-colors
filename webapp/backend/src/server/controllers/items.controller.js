const service = require("../services/items.service");

function getItems(ctx) {
  return (req, res, next) => {
    service
      .getAll(Object.assign(req.query), ctx)
      .then((data) => res.send(data))
      .catch((error) => next(error));
  };
}

function getFavorites(ctx) {
  return (req, res, next) => {
    service
      .getFavorites(req.query, ctx)
      .then((data) => res.send(data))
      .catch((error) => next(error));
  };
}

function addFavorite(req, res, next) {
  service
    .addFavorite(req.query, ctx)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function deleteFavorite(req, res, next) {
  service
    .deleteFavorite(req.query, ctx)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function getFiles(ctx) {
  return (req, res, next) => {
    service
      .sendFiles(Object.assign(req.query), ctx)
      .then((data) => res.send(data))
      .catch((error) => next(error));
  };
}

module.exports = {
  getItems,
  getFiles,
  getFavorites,
  deleteFavorite,
  addFavorite,
};
