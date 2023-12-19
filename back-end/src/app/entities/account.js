const { EntitySchema } = require('typeorm');

const AccountEntity = new EntitySchema({
  name: 'Account',
  tableName: 'accounts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    isAdmin: {
      type: 'boolean',
    },
  },
});

module.exports = { AccountEntity };
