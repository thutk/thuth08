class Account {
  constructor(email, password, name, isAdmin = false) {
    this.id = undefined;
    this.email = email;
    this.password = password;
    this.name = name;
    this.isAdmin = isAdmin;
  }
}

module.exports = { Account };
