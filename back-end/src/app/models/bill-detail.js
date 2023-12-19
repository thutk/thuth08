class BillDetail {
  constructor(billId, medicineId, amount) {
    this.id = undefined;
    this.billId = billId;
    this.medicineId = medicineId;
    this.amount = amount;
    this.bill = undefined;
    this.medicine;
  }
}

module.exports = { BillDetail };
