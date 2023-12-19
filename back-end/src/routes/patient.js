const express = require('express');

const {
  createPatient,
  getAllPatient,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../app/controllers/patient');

const router = express.Router();

router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/', getAllPatient);
router.post('/', createPatient);

module.exports = router;
