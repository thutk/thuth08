const express = require('express');

const {
  createMedicine,
  getAllMedicine,
  getMedicineById,
  getMedicinesByType,
  updateMedicine,
  deleteMedicine,
} = require('../app/controllers/medicine');

const router = express.Router();

router.get('/:id', getMedicineById);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);
router.get('/type/:id', getMedicinesByType);

router.get('/', getAllMedicine);
router.post('/', createMedicine);

module.exports = router;
