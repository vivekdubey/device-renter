const users = require('../models/users');
const message = require('../response-messages');

const getUsers = async ( request, response ) => {
  try {
    let res = await users.getAll();
    response.status(200).json(res);
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const getUserById = async ( request, response ) => {
  try {
    const id = parseInt(request.params.id)
    let res = await users.getUserById(id);
    response.status(200).json(res);
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const createUser = async ( request, response ) => {
  try {
    const { name, email, role, password } = request.body;
    const res =  await users.createUser(name, email, role, password);
    response.status(201).json(res);
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const updatePassword = async ( request, response ) => {
  try {
    const { password, email } = request.body;
    await users.updatePassword({password, email});
    response.status(200).send(`User modified with email: ${email}`);
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const deleteUser = async ( request, response ) => {
  try {
    const { email } = request.body;
    await users.deleteUser(email);
    response.status(200).send(`User deleted with email: ${email}`)
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updatePassword,
  deleteUser
}
