const users = require('../models/users');
const message = require('../response-messages');

const getUsers = async ( request, response ) => {
  try {
    let res = await users.getAll();
    // response.render('users', { users: res });
    response.render('users', {page:'Librarian List', menuId:'librarians', users: res});
    // response.status(200).json(res);
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const getAddForm = (request, response) => {
  // response.render('addUser', {});
  response.render('addUser', {page:'New Librarian Form', menuId:'add_librarian'});
}

const removeUserForm = async (request, response) => {
  try {
    const res = await await users.getAll();;
    response.render('removeUser', { page:'Remove User Form', menuId:'remove_user', users: res});
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

const addUser = async ( request, response ) => {
  try {
    const { username, email, display_name } = request.body;
    console.log(request.body);
    await users.addUser(request.body);
    response.render('userAdded', {page:'Success Message!', menuId:'librarians', user: request.body});
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

const removeUser = async ( request, response ) => {
  try {
    const { username } = request.body;
    const authoriser = request.user.username;
    await users.removeUser(username);
    response.render('userRemoved', {page:'User Removal Message!', menuId:'remove_user', username: username, authoriser: authoriser});
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updatePassword,
  removeUser,
  getAddForm,
  removeUserForm
}
