const { Medicine } = require('../models/medicine');
const { dataSource } = require('../../config/db');

async function createMedicine(req, res) {
  const { id, name, unit, price, amountPerDay, usage, type, description } =
    req.body;
  if (id && name && unit && price && amountPerDay && usage && type) {
    const medicineRepository = dataSource.getRepository('Medicine');
    const medicine = await medicineRepository.save(
      new Medicine(
        id,
        name,
        unit,
        price,
        amountPerDay,
        usage,
        description,
        type
      )
    );
    return res.status(200).json({ message: 'Success', data: medicine });
  }
  res.status(400).json({
    message: 'code, name, unit, price, amountPerDay, usage, type are required',
  });
}

async function getAllMedicine(_req, res) {
  const medicineRepository = dataSource.getRepository('Medicine');
  const medicines = await medicineRepository.find({
    relations: { medicineType: true },
  });
  res.status(200).json(medicines);
}

async function getMedicineById(req, res) {
  const { id } = req.params;
  const medicineRepository = dataSource.getRepository('Medicine');
  const medicine = await medicineRepository.findOne({ where: { id } });
  if (medicine) {
    return res.status(200).json(medicine);
  }
  return res.status(404).json({ message: 'Not found' });
}

async function getMedicinesByType(req, res) {
  const { id } = req.params;
  const medicineRepository = dataSource.getRepository('Medicine');
  const medicines = await medicineRepository.find({ where: { medicineTypeId: id } });
  if (medicines.length) {
    return res.status(200).json(medicines);
  }
  return res.status(404).json({ message: 'Not found' });
}

async function updateMedicine(req, res) {
  const { id } = req.params;
  const medicineRepository = dataSource.getRepository('Medicine');
  const medicine = await medicineRepository.findOne({ where: { id } });
  if (medicine) {
    await medicineRepository.save({ ...medicine, ...req.body });
    return res.status(200).json({ message: 'Updated' });
  }
  return res.status(404).json({ message: 'Not found' });
}

async function deleteMedicine(req, res) {
  const { id } = req.params;
  const medicineRepository = dataSource.getRepository('Medicine');
  await medicineRepository.delete(id);
  res.status(200).json({ message: 'Deleted' });
}

module.exports = {
  createMedicine,
  getAllMedicine,
  getMedicineById,
  getMedicinesByType,
  updateMedicine,
  deleteMedicine,
};
