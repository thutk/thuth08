const express = require('express');

const {
  createMedicineType,
  getAllMedicineType,
  getMedicineTypeById,
  updateMedicineType,
  deleteMedicineType,
} = require('../app/controllers/medicine-type');

const router = express.Router();

router.post('/', createMedicineType);
router.get('/', getAllMedicineType);
router.get('/:id', getMedicineTypeById);
router.put('/:id', updateMedicineType);
router.delete('/:id', deleteMedicineType);

module.exports = router;
