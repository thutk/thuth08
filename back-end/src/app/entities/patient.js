const { EntitySchema } = require('typeorm');

const PatientEntity = new EntitySchema({
  name: 'Patient',
  tableName: 'patients',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    gender: {
      type: 'boolean',
    },
    age: {
      type: 'int',
      nullable: true,
    },
    phone: {
      type: 'varchar',
    },
    address: {
      type: 'text',
      nullable: true,
    },
  },
});

module.exports = { PatientEntity };
