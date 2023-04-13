var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: true,
    },
    user_id: {
      type: "bigint",
      nullable: false,
    },
    creation_date: {
      createDate: true,
    },
    status: {
      type: "enum",
      enum: ["basket", "Новый", "Оплачен", "На доставке", "Доставлен"],
      default: "Новый",
    },
    total: {
      type: "int",
      nullable: true,
    },
    selected_dm: {
      type: "enum",
      enum: ["Я. Доставка", "CДЭК"],
      nullable: true,
    },
    selected_po: {
      type: "enum",
      enum: ["yookassa"],
      nullable: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      cascade: true,
    },
  },
});
