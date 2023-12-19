const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../constants');
const { dataSource } = require('../../config/db');
const { Account } = require('../models/account');

async function register(req, res) {
  const { email, password, rePassword, name, isAdmin } = req.body;
  if (email && password && rePassword && name) {
    if (password !== rePassword) {
      return res.status(400).json({ message: 'Password is not match' });
    }
    const accountRepository = dataSource.getRepository('Account');
    const account = await accountRepository.findOne({ where: { email } });
    if (account) {
      return res.status(400).json({ message: 'Email is already existed' });
    }
    await accountRepository.save(new Account(email, password, name, isAdmin));
    return res.status(200).json({ message: 'Success' });
  }
  return res
    .status(400)
    .json({ message: 'Email, password, rePassword and name are required' });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (email && password) {
    const accountRepository = dataSource.getRepository('Account');
    const account = await accountRepository.findOne({
      where: { email, password },
    });
    if (account) {
      const accessToken = jwt.sign(
        {
          accountId: account.id,
          email,
          isAdmin: account.isAdmin,
          name: account.name,
        },
        JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      return res
        .status(200)
        .json({ id: account.id, email, name: account.name, accessToken });
    }
    return res.status(401).json({ message: 'Email or password is invalid' });
  }
  return res.status(400).json({ message: 'Email and password are required' });
}

module.exports = { login, register };
