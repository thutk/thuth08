require('dotenv').config();
const { DataSource } = require('typeorm');

const { AccountEntity } = require('../app/entities/account');
const { BillEntity } = require('../app/entities/bill');
const { MedicineEntity } = require('../app/entities/medicine');
const { MedicineTypeEntity } = require('../app/entities/medicine-type');
const { PatientEntity } = require('../app/entities/patient');
const { BillDetailEntity } = require('../app/entities/bill-detail');
const { DEFAULT_ADMIN, DEFAULT_ADMIN_PASSWORD } = require('../constants');

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [
    AccountEntity,
    BillEntity,
    MedicineEntity,
    MedicineTypeEntity,
    PatientEntity,
    BillDetailEntity,
  ],
});

async function connect() {
  try {
    await dataSource.initialize();
    console.log('Connect database success');
    const accountRepository = dataSource.getRepository('Account');
    const accounts = await accountRepository.find();
    if (!accounts.length) {
      await accountRepository.save({
        email: DEFAULT_ADMIN,
        password: DEFAULT_ADMIN_PASSWORD,
        name: 'admin',
        isAdmin: true,
      });
    }
  } catch (e) {
    console.log('Connect database failed');
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();
    console.log('Disconnect database success');
  } catch {
    console.log('Disconnect database failed');
  }
}

module.exports = { connect, disconnect, dataSource };
