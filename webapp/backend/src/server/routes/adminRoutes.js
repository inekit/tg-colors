var express = require("express");
var router = express.Router();
var {
  login,
  register,
  authAdmin: auth,
} = require("../controllers/user.authentication");
var UsersController = require("../controllers/user.controller");
var ItemsController = require("../controllers/items.controller");
var OrdersController = require("../controllers/orders.controller");
var PromosController = require("../controllers/promos.controller");
var MessagesController = require("../controllers/messages.controller");
var PricesController = require("../controllers/prices.controller");

var TagsController = require("../controllers/tags.controller");
var CategoriesController = require("../controllers/categories.controller");
var StaticsController = require("../controllers/statics.controller");

var fileUpload = require("express-fileupload");
router.use(fileUpload({}));

module.exports = (ctx) => {
  router.get("/users", auth, UsersController.getAll);
  router.delete("/users", auth, UsersController.adminDelete);

  router.get("/items", auth, ItemsController.getAll);
  router.post("/items", auth, ItemsController.addOne);
  router.put("/items", auth, ItemsController.editOne);
  router.delete("/items", auth, ItemsController.deleteOne);

  router.get("/orders", auth, OrdersController.getAll);
  router.post("/orders", auth, OrdersController.addOne(ctx));
  router.put("/orders", auth, OrdersController.editOne(ctx));
  router.delete("/orders", auth, OrdersController.deleteOne);

  router.get("/prices", auth, PricesController.get);
  router.put("/prices", auth, PricesController.edit);

  router.put("/orders_items", auth, OrdersController.editItem);
  router.delete("/orders_items", auth, OrdersController.dropItem);

  router.get("/promos", auth, PromosController.get);
  router.post("/promos", auth, PromosController.add);
  router.put("/promos", auth, PromosController.edit);
  router.delete("/promos", auth, PromosController.drop);

  router.post("/tags", auth, TagsController.addOne);
  router.put("/tags", auth, TagsController.editOne);
  router.delete("/tags", auth, TagsController.deleteOne);

  router.post("/categories", auth, CategoriesController.addOne);
  router.put("/categories", auth, CategoriesController.editOne);
  router.delete("/categories", auth, CategoriesController.deleteOne);

  router.post("/categories", auth, CategoriesController.addOne);
  router.put("/categories", auth, CategoriesController.editOne);
  router.delete("/categories", auth, CategoriesController.deleteOne);

  router.post("/messages", auth, MessagesController.addOne(ctx));

  router.get("/statics", auth, StaticsController.getOne);
  router.put("/statics", auth, StaticsController.editOne);

  router.post("/login", login.local);
  router.put("/register", register.local);
  router.get("/logout", auth, (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }

      return res.send(
        JSON.stringify({ isAuthenticated: req.isAuthenticated() })
      );
    });
  });

  return router;
};
