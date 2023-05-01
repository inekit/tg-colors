const servicePreset = require("../services/crud.service").getService(
  "Category",
  ["name", "description"]
);
const categoriesService = require("../services/categories.service");

function getAll(req, res, next) {
  console.log(req.query.category);
  if (!req.query.id)
    servicePreset
      .get(req.query.id, req.query.page, 100)
      .then((data) => res.send(data))
      .catch((error) => next(error));
  else getOne(req, res);
}

function getOne(req, res, next) {
  servicePreset
    .get(req.query.id, 1, 1)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function addOne(req, res, next) {
  const { name, description, backside_available } = req.body;

  categoriesService
    .add({
      name,
      description,
      backside_available,
      image: req.body?.["preview"],
      previewBinary: req.files?.["preview"],
    })
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function editOne(req, res, next) {
  const { name, description, old_name, backside_available } = req.body;

  categoriesService
    .edit({
      name,
      description,
      backside_available,
      old_name,
      image: req.body?.["preview"],
      previewBinary: req.files?.["preview"],
      id: req.body.id,
    })
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function deleteOne(req, res, next) {
  servicePreset
    .delete(req.body.name, "name")
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

module.exports = {
  getAll,
  getOne,
  addOne,
  editOne,
  deleteOne,
};
