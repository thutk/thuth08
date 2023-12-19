const { EntitySchema } = require('typeorm');

const BillDetailEntity = new EntitySchema({
  name: 'BillDetail',
  tableName: 'bill_details',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    billId: {
      type: 'int',
      name: 'bill_id',
    },
    medicineId: {
      type: 'varchar',
      name: 'medicine_id',
    },
    amount: {
      type: 'int',
    },
  },
  relations: {
    bill: {
      target: 'Bill',
      type: 'many-to-one',
      joinColumn: { name: 'bill_id' },
      joinTable: true,
      cascade: true,
    },
    medicine: {
      target: 'Medicine',
      type: 'many-to-one',
      joinColumn: { name: 'medicine_id' },
      joinTable: true,
      cascade: true,
    },
  },
});

module.exports = { BillDetailEntity };
