require('dotenv').config();
const request = require('supertest');

const app = require('../src/index');
const { DEFAULT_ADMIN, DEFAULT_ADMIN_PASSWORD } = require('../src/constants');
const { dataSource } = require('../src/config/db');

describe('Create bill', () => {
  let accessToken;
  let medicineTypeId;
  let medicine;
  let billId;

  beforeAll(async () => {
    await dataSource.initialize();
    const { body } = await request(app)
      .post('/login')
      .send({ email: DEFAULT_ADMIN, password: DEFAULT_ADMIN_PASSWORD });
    accessToken = body.accessToken;
    const medicineTypeRes = await request(app)
      .post('/medicine-types')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'test medicine type' });
    medicineTypeId = medicineTypeRes.body.data.id;
    const res = await request(app)
      .post('/medicines')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        id: 'THtest',
        name: 'medicine test',
        unit: 'vien',
        price: 500,
        amountPerDay: 3,
        usage: 'usage',
        type: medicineTypeId,
      });
    medicine = res.body.data;
  });

  afterAll(async () => {
    const billRepository = dataSource.getRepository('Bill');
    const billDetailRepository = dataSource.getRepository('BillDetail');
    await billDetailRepository
      .createQueryBuilder('billDetails')
      .delete()
      .where('billId = :billId', { billId })
      .execute();
    await billRepository.delete(billId);
    await request(app)
      .delete(`/medicines/${medicine.id}`)
      .set({ Authorization: `Bearer ${accessToken}` });
    await request(app)
      .delete(`/medicine-types/${medicineTypeId}`)
      .set({ Authorization: `Bearer ${accessToken}` });
    await dataSource.destroy();
  });

  it('should be success', async () => {
    const { body, status } = await request(app)
      .post('/bills')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        patient: { name: 'benh nhan 1', gender: true, phone: '0123456789' },
        medicines: [{ ...medicine, amount: 2 }],
        description: 'description',
      });
    billId = body.id;
    expect(status).toEqual(200);
  });
});
