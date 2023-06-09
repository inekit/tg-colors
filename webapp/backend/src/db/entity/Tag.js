const { text } = require('body-parser');

var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Tag',
  tableName: 'tags',
  columns: {
    name: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    description: {
      type: 'text',
      nullable: true,
    },
  },
});
