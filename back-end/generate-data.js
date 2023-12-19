const { dataSource } = require('./src/config/db');
const { MedicineType } = require('./src/app/models/medicine-type');
const { Medicine } = require('./src/app/models/medicine');

(async () => {
  await dataSource.initialize();
  const types = await dataSource.getRepository('MedicineType').save([
    new MedicineType('Loai thuoc 1', ''),
    new MedicineType('Loai thuoc 2', ''),
    new MedicineType('Loai thuoc 3', ''),
    new MedicineType('Loai thuoc 4', ''),
    new MedicineType('Loai thuoc 5', ''),
  ]);
  await dataSource.getRepository('Medicine').save([
    new Medicine('TH001', 'Thuoc 1', 'vien', 500, 3, '3 vien 1 ngay', '', types[0].id),
    new Medicine('TH002', 'Thuoc 2', 'vien', 400, 4, '4 vien 1 ngay', '', types[1].id),
    new Medicine('TH003', 'Thuoc 3', 'vien', 300, 2, '2 vien 1 ngay', '', types[2].id),
    new Medicine('TH004', 'Thuoc 4', 'vien', 200, 1, '1 vien 1 ngay', '', types[3].id),
    new Medicine('TH005', 'Thuoc 5', 'vien', 1000, 1, '1 vien 1 ngay', '', types[4].id),
    new Medicine('TH006', 'Thuoc 6', 'vien', 600, 3, '3 vien 1 ngay', '', types[0].id),
    new Medicine('TH007', 'Thuoc 7', 'vien', 700, 3, '3 vien 1 ngay', '', types[1].id),
    new Medicine('TH008', 'Thuoc 8', 'vien', 800, 3, '3 vien 1 ngay', '', types[2].id),
    new Medicine('TH009', 'Thuoc 9', 'vien', 900, 3, '3 vien 1 ngay', '', types[3].id),
    new Medicine('TH010', 'Thuoc 10', 'vien', 500, 2, '2 vien 1 ngay', '', types[4].id),
    new Medicine('TH011', 'Thuoc 11', 'vien', 500, 2, '2 vien 1 ngay', '', types[0].id),
    new Medicine('TH012', 'Thuoc 12', 'vien', 500, 2, '2 vien 1 ngay', '', types[1].id),
    new Medicine('TH013', 'Thuoc 13', 'vien', 500, 2, '2 vien 1 ngay', '', types[2].id),
    new Medicine('TH014', 'Thuoc 14', 'vien', 550, 3, '3 vien 1 ngay', '', types[3].id),
    new Medicine('TH015', 'Thuoc 15', 'vien', 650, 3, '3 vien 1 ngay', '', types[4].id),
    new Medicine('TH016', 'Thuoc 16', 'vien', 750, 3, '3 vien 1 ngay', '', types[0].id),
    new Medicine('TH017', 'Thuoc 17', 'vien', 450, 3, '3 vien 1 ngay', '', types[1].id),
    new Medicine('TH018', 'Thuoc 18', 'vien', 500, 3, '3 vien 1 ngay', '', types[2].id),
    new Medicine('TH019', 'Thuoc 19', 'vien', 500, 3, '3 vien 1 ngay', '', types[3].id),
    new Medicine('TH020', 'Thuoc 20', 'vien', 500, 3, '3 vien 1 ngay', '', types[4].id),
  ])
  await dataSource.destroy();
})();
