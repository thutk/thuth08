class Medicine {
  constructor(
    id,
    name,
    unit,
    price,
    amountPerDay,
    usage,
    description,
    medicineTypeId
  ) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.amountPerDay = amountPerDay;
    this.usage = usage;
    this.description = description;
    this.medicineTypeId = medicineTypeId;
    this.medicineType = undefined;
  }
}

module.exports = { Medicine };
