const service = require("../services/crud.service").getService("Item", [
  "title",
  "text",
  "description",
]);
const itemsService = require("../services/items.service");
const { getPosts, editPost, transformTagsArray, transformPreviewName } =
  itemsService;

function getAllCreator(showText = true) {
  return async function getAll(req, res, next) {
    getPosts(Object.assign(req.query, { showText }))
      .then((data) => res.send(data))
      .catch((error) => next(error));
  };
}

function getRss(req, res, next) {
  try {
    res.redirect("/public/RSS.xml");
  } catch (e) {}
}

function addOne(req, res, next) {
  const { title, text, tagsArray, projectName, previewName, description } =
    req.body;

  const previewsBinary = req.files?.["images[]"];

  const fNameFullPaths = Array.isArray(previewsBinary)
    ? previewsBinary.map((preview) => transformPreviewName(preview))
    : [transformPreviewName(previewsBinary)];

  const tagObjs = transformTagsArray(tagsArray);

  service
    .add({
      title,
      description,
      text,
      category_name: projectName,
      tags: tagObjs,
      image_list: fNameFullPaths,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => next(error));
}

async function editOne(req, res, next) {
  editPost(
    Object.assign(req.body, {
      images: req.body?.["images[]"],
      previewsBinary: req.files?.["images[]"],
    })
  )
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function deleteOne(req, res, next) {
  service
    .delete(req.body.id)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function getFavorites(req, res, next) {
  itemsService
    .getFavorites(req.query, ctx)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function addFavorite(req, res, next) {
  itemsService
    .addFavorite(req.body)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function deleteFavorite(req, res, next) {
  itemsService
    .deleteFavorite(req.body)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

module.exports = {
  getAll: getAllCreator(false),
  getAllWithText: getAllCreator(true),
  getRss,
  addOne,
  editOne,
  deleteOne,
  getFavorites,
  deleteFavorite,
  addFavorite,
};
