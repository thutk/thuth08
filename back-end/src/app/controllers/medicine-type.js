const { dataSource } = require('../../config/db');

async function createMedicineType(req, res) {
  const { name, description } = req.body;
  if (name) {
    const medicineTypeRepository = dataSource.getRepository('MedicineType');
    const medicineType = await medicineTypeRepository.save({ name, description });
    return res.status(200).json({ message: 'Success', data: medicineType });
  }
  res.status(400).json({
    message: 'Name is required',
  });
}

async function getAllMedicineType(_req, res) {
  const medicineTypeRepository = dataSource.getRepository('MedicineType');
  const medicineTypes = await medicineTypeRepository.find();
  res.status(200).json(medicineTypes);
}

async function getMedicineTypeById(req, res) {
  const { id } = req.params;
  const medicineTypeRepository = dataSource.getRepository('MedicineType');
  const medicineType = await medicineTypeRepository.findOne({ where: { id } });
  if (medicineType) {
    return res.status(200).json(medicineType);
  }
  return res.status(404).json({ message: 'Not found' });
}

async function updateMedicineType(req, res) {
  const { id } = req.params;
  const medicineTypeRepository = dataSource.getRepository('MedicineType');
  const medicineType = await medicineTypeRepository.findOne({ where: { id } });
  if (medicineType) {
    medicineType = { ...medicineType, ...req.body };
    await medicineTypeRepository.save(medicineType);
    return res.status(200).json({ message: 'Updated' });
  }
  return res.status(404).json({ message: 'Not found' });
}

async function deleteMedicineType(req, res) {
  const { id } = req.params;
  const medicineTypeRepository = dataSource.getRepository('MedicineType');
  await medicineTypeRepository.delete(id);
  res.status(200).json({ message: 'Deleted' });
}

module.exports = {
  createMedicineType,
  getAllMedicineType,
  getMedicineTypeById,
  updateMedicineType,
  deleteMedicineType,
};
