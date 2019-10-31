const db = require('./connection');

const getAll = async () => {
  try {
    const queryStr = 'SELECT * FROM users ORDER BY id ASC';
    let res = await db.query(queryStr);
    return res.rows;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getById = async (id) => {
  try {
    const queryStr = 'SELECT * FROM users WHERE id = $1';
    let res = await db.query(queryStr, [id]);
    return res.rows;
  } catch (err) {
    throw new Error(err.message);
  }

}

const createUser = async (name, email, role, password) => {
  try {
    const queryStr = 'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4)';
    let res = await db.query(queryStr, [name, email, role, password]);
    return res.insertId;
  } catch(err) {
    throw new Error(err.message);
  }
}

const updatePassword = async ( { email, password } ) => {
  try {
    const queryStr = 'UPDATE users SET password = $1 WHERE email = $2';
    return await db.query(queryStr, [password, email]);
  } catch (err) {
    throw new Error(err.message);
  }
}

const deleteUser = async (email) => {
  try {
    const queryStr = 'DELETE FROM users WHERE email = $1';
    return await db.query(queryStr, [email]);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getAll,
  getById,
  createUser,
  updatePassword,
  deleteUser
}
