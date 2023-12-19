const { isAuthentication } = require('../app/middlewares/isAuthentication');

const authRouter = require('./auth');
const medicineTypeRouter = require('./medicine-type');
const medicineRouter = require('./medicine');
const patientRouter = require('./patient');
const billRouter = require('./bill');

async function useRouter(app) {
  app.use('/', authRouter);
  app.use('/medicine-types', isAuthentication, medicineTypeRouter);
  app.use('/medicines', isAuthentication, medicineRouter);
  app.use('/patients', isAuthentication, patientRouter);
  app.use('/bills', billRouter);
}

module.exports = { useRouter };
