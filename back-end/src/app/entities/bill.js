const { EntitySchema } = require('typeorm');

const BillEntity = new EntitySchema({
  name: 'Bill',
  tableName: 'bills',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    createdBy: {
      type: 'int',
      name: 'created_by',
    },
    patientId: {
      type: 'int',
      name: 'patient_id',
    },
    total: {
      type: 'int',
    },
    description: {
      type: 'text',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp'
    }
  },
  relations: {
    createdAccount: {
      target: 'Account',
      type: 'many-to-one',
      joinColumn: { name: 'created_by' },
      joinTable: true,
      cascade: true,
    },
    patient: {
      target: 'Patient',
      type: 'many-to-one',
      joinColumn: { name: 'patient_id' },
      joinTable: true,
      cascade: true,
    },
  },
});

module.exports = { BillEntity };
