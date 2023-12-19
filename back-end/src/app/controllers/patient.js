const { Patient } = require('../models/patient');
const { dataSource } = require('../../config/db');

async function createPatient(req, res) {
  const { name, gender, age, phone, address } = req.body;
  if (name && gender && phone) {
    const patientRepository = dataSource.getRepository('Patient');
    const patient = await patientRepository.save(
      new Patient(name, gender, age, phone, address)
    );
    return res.status(200).json({ message: 'Success', data: patient });
  }
  res.status(400).json({
    message: 'name, gender, phone are required',
  });
}

async function getAllPatient(_req, res) {
  const patientRepository = dataSource.getRepository('Patient');
  const patients = await patientRepository.find();
  res.status(200).json(patients);
}

async function getPatientById(req, res) {
  const { id } = req.params;
  const patientRepository = dataSource.getRepository('Patient');
  const patient = await patientRepository.findOne({ where: { id } });
  if (patient) {
    return res.status(200).json(patient);
  }
  return res.status(404).json({ message: 'Not found' });
}

async function updatePatient(req, res) {
  const { id } = req.params;
  const patientRepository = dataSource.getRepository('Patient');
  const patient = await patientRepository.findOne({ where: { id } });
  if (patient) {
    await patientRepository.save({ ...patient, ...req.body });
    return res.status(200).json({ message: 'Updated' });
  }
  return res.status(404).json({ message: 'Not found' });
}

async function deletePatient(req, res) {
  const { id } = req.params;
  const patientRepository = dataSource.getRepository('Patient');
  await patientRepository.delete(id);
  res.status(200).json({ message: 'Deleted' });
}

module.exports = {
  createPatient,
  getAllPatient,
  getPatientById,
  updatePatient,
  deletePatient,
};
