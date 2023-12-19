require('dotenv').config();
const request = require('supertest');

const app = require('../src/index');
const { DEFAULT_ADMIN, DEFAULT_ADMIN_PASSWORD } = require('../src/constants');
const { dataSource } = require('../src/config/db');

describe('Login', () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be success', async () => {
    await request(app)
      .post('/login')
      .send({ email: DEFAULT_ADMIN, password: DEFAULT_ADMIN_PASSWORD })
      .expect(200);
  });

  describe('should be failed', () => {
    it('without email and password in body', async () => {
      await request(app).post('/login').expect(400);
    });

    it('without email and password in body', async () => {
      await request(app)
        .post('/login')
        .send({ email: DEFAULT_ADMIN, password: 'some-password' })
        .expect(401);
    });
  });
});

describe('Register', () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });

  afterAll(async () => {
    const accountRepository = dataSource.getRepository('Account');
    const account = await accountRepository.findOne({
      where: { email: 'test@test.com' },
    });
    await accountRepository.delete(account.id);
    await dataSource.destroy();
  });

  it('should be success', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: DEFAULT_ADMIN, password: DEFAULT_ADMIN_PASSWORD });
    await request(app)
      .post('/register')
      .set({ Authorization: `Bearer ${res.body.accessToken}` })
      .send({
        email: 'test@test.com',
        password: 'test',
        rePassword: 'test',
        name: 'test',
      })
      .expect(200);
  });

  it('should be failed', async () => {
    await request(app)
      .post('/register')
      .send({
        email: 'test@test.com',
        password: 'test',
        rePassword: 'test',
        name: 'test',
      })
      .expect(401);
  });
});
