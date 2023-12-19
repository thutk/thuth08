class Patient {
  constructor(name, gender, age, phone, address) {
    this.id = undefined;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

module.exports = { Patient };
