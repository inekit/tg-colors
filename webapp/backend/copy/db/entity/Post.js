var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'varchar',
      length: 255,
      nullable: false,
      default: 'Описание поста',
    },
    text: {
      type: 'text',
      nullable: false,
    },
    preview_name: {
      type: 'varchar',
      length: 300,
      nullable: true,
    },
    publication_date: {
      createDate: true,
    },
    project_name: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
  relations: {
    project: {
      target: 'Project',
      type: 'many-to-one',
      joinColumn: true,
      cascade: false,
    },
    tags: {
      target: 'Tag',
      type: 'many-to-many',
      joinTable: true,
      cascade: false,
    },
  },
});
