const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit-table');
const { Between } = require('typeorm');

const { Bill } = require('../models/bill');
const { Patient } = require('../models/patient');
const { BillDetail } = require('../models/bill-detail');
const { dataSource } = require('../../config/db');
const { createTextData, createTableData } = require('../../helpers');

async function createBill(req, res) {
  const { userId, name: createdBy } = req;
  const { patient, medicines, description } = req.body;

  if (patient && Array.isArray(medicines)) {
    const { name, gender, age, phone, address } = patient;

    const patientRepository = dataSource.getRepository('Patient');
    const billRepository = dataSource.getRepository('Bill');
    const billDetailRepository = dataSource.getRepository('BillDetail');

    let savedPatient = await patientRepository.findOne({ where: { phone } });
    if (!savedPatient) {
      savedPatient = await patientRepository.save(
        new Patient(name, gender, age, phone, address)
      );
    }
    const bill = await billRepository.save(
      new Bill(userId, savedPatient.id, 0, description)
    );
    let total = 0;
    const billDetails = Array.from(medicines).map((medicine) => {
      total += medicine.price * medicine.amount;
      return new BillDetail(bill.id, medicine.id, medicine.amount);
    });
    await billDetailRepository.save(billDetails);
    bill.total = total;
    await billRepository.save(bill);
    return res.status(200).json({
      id: bill.id,
      patient: savedPatient,
      createdBy,
      total,
      description,
      medicines,
      createdAt: bill.createdAt,
    });
  }
  res.status(400).json({ message: 'patient, medicines are required' });
}

async function getBills(req, res) {
  const { from, to } = req.query;
  const billRepository = dataSource.getRepository('Bill');
  let bills;
  if (from && to) {
    bills = await billRepository.find({
      where: {
        createdAt: Between(new Date(from), new Date(to)),
      },
      relations: { createdAccount: true, patient: true },
      order: { createdAt: 'DESC' },
    });
  } else {
    bills = await billRepository.find({
      relations: { createdAccount: true, patient: true },
      order: { createdAt: 'DESC' },
    });
  }
  res.status(200).json(bills);
}

async function getBillById(req, res) {
  const { id } = req.params;
  const billRepository = dataSource.getRepository('Bill');
  const billDetailRepository = dataSource.getRepository('BillDetail');
  const [bill, billDetails] = await Promise.all([
    billRepository.findOne({
      where: { id },
      relations: { createdAccount: true, patient: true },
    }),
    billDetailRepository.find({
      where: { billId: id },
      relations: { medicine: true },
    }),
  ]);
  res.status(200).json({
    ...bill,
    medicines: billDetails.map((detail) => ({
      ...detail.medicine,
      amount: detail.amount,
    })),
  });
}

async function downloadBillById(req, res) {
  const { id } = req.params;
  const billRepository = dataSource.getRepository('Bill');
  const billDetailRepository = dataSource.getRepository('BillDetail');
  const [bill, billDetails] = await Promise.all([
    billRepository.findOne({
      where: { id },
      relations: { createdAccount: true, patient: true },
    }),
    billDetailRepository.find({
      where: { billId: id },
      relations: { medicine: true },
    }),
  ]);
  const data = {
    ...bill,
    medicines: billDetails.map((detail) => ({
      ...detail.medicine,
      amount: detail.amount,
    })),
  };

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream('bill.pdf');
  doc.pipe(writeStream);
  doc.text(createTextData(data), 50, 50);
  doc.moveDown();
  doc.table(createTableData(data), {
    width: 450,
  });
  doc.end();

  writeStream.on('finish', () => {
    res.sendFile('bill.pdf', {
      root: path.join(__dirname, '..', '..', '..'),
    });
  });
}

module.exports = { createBill, getBills, getBillById, downloadBillById };
