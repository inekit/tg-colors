const service = require("../services/crud.service").getService("Item", [
  "title",
  "text",
  "description",
]);
const itemsService = require("../services/items.service");
const { getPosts, add, editPost, transformTagsArray, transformPreviewName } =
  itemsService;

function getAll(req, res, next) {
  getPosts(req.query)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function getRss(req, res, next) {
  try {
    res.redirect("/public/RSS.xml");
  } catch (e) {}
}

function addOne(req, res, next) {
  add(
    Object.assign(req.body, {
      images: req.body?.["images[]"],
      previewsBinary: req.files?.["images[]"],
    })
  )
    .then((data) => res.send(data))
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

module.exports = {
  getAll,
  getRss,
  addOne,
  editOne,
  deleteOne,
};
