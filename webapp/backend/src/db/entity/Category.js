const { text } = require("body-parser");

var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    name: {
      type: "varchar",
      primary: true,
      length: 255,
    },
    description: {
      type: "text",
      nullable: true,
    },
    preview: {
      type: "varchar",
      length: 300,
      nullable: true,
    },
    backside_available: {
      type: "boolean",
      nullable: false,
      default: true,
    },
    order_id: {
      type: "int",
      default: 0,
    },
  },
});
