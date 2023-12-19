const { EntitySchema } = require('typeorm');

const MedicineEntity = new EntitySchema({
  name: 'Medicine',
  tableName: 'medicines',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    unit: {
      type: 'varchar',
    },
    price: {
      type: 'int',
    },
    amountPerDay: {
      type: 'int',
      name: 'amount_per_day',
    },
    usage: {
      type: 'text',
    },
    description: {
      type: 'text',
      nullable: true,
    },
    medicineTypeId: {
      type: 'int',
      name: 'medicine_type_id',
    },
  },
  relations: {
    medicineType: {
      target: 'MedicineType',
      type: 'many-to-one',
      joinColumn: { name: 'medicine_type_id' },
      joinTable: true,
      cascade: true,
    },
  },
});

module.exports = { MedicineEntity };
