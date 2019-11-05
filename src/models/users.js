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

const userExists = async (username) => {
  try {
    const queryStr = 'SELECT * FROM users WHERE username = $1';
    let res = await db.query(queryStr, [username]);
    return (res.rows).length == 1;
  } catch (err) {
    throw new Error(err.message);
  }
}

const addUser = async (payload) => {
  try {
    const { username, email, display_name } = payload
    const queryStr = 'INSERT INTO users (username, display_name, email) VALUES ($1, $2, $3)';
    let res = await db.query(queryStr, [username, display_name, email]);
    return res.insertId;
  } catch(err) {
    throw new Error(err.message);
  }
}


const deleteUser = async (username) => {
  try {
    const queryStr = 'DELETE FROM users WHERE username = $1';
    return await db.query(queryStr, [username]);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getAll,
  addUser,
  deleteUser,
  userExists
}
