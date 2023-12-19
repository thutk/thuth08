const express = require('express');

const { isAuthentication } = require('../app/middlewares/isAuthentication');

const {
  createBill,
  getBills,
  getBillById,
  downloadBillById,
} = require('../app/controllers/bill');

const router = express.Router();

router.get('/:id/download', downloadBillById);

router.use(isAuthentication);
router.get('/:id', isAuthentication, getBillById);
router.get('/', getBills);
router.post('/', createBill);

module.exports = router;
