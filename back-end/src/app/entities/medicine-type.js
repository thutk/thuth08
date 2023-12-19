const { EntitySchema } = require('typeorm');

const MedicineTypeEntity = new EntitySchema({
  name: 'MedicineType',
  tableName: 'medicine_types',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
  },
});

module.exports = { MedicineTypeEntity };
