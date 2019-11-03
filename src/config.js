module.exports = {
  port: 3001,
  githubCallbackURL: 'http://localhost:3001/auth/callback',
  githubEnterpriseHostName: 'enterprise.github.com',
  cookieMaxAge: 300,
  db: {
    user: 'me',
    host: 'localhost',
    database: 'device_librarian',
    password: 'password',
    port: 5432,
  }
}
