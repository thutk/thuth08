class Bill {
  constructor(createdBy, patientId, total, description) {
    this.id = undefined;
    this.createdBy = createdBy;
    this.patientId = patientId;
    this.total = total;
    this.description = description;
    this.createdAccount = undefined;
    this.patient = undefined;
    this.medicines = undefined;
    this.createdAt = new Date();
  }
}

module.exports = { Bill };
