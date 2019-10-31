module.exports = function () {
  return {
    port: 3001,
    cookieMaxAge: 300,
    db: {
      user: 'me',
      host: 'localhost',
      database: 'device_librarian',
      password: 'password',
      port: 5432,
    }
  }
}
