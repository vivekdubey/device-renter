module.exports = {
  port: 3001,
  githubCallbackURL: 'http://localhost:3001/auth/callback',
  githubEnterpriseHostName: process.env.GITHUB_ENTERPRISE_HOSTNAME,
  cookieMaxAge: 300,
  db: {
    user: 'me',
    host: 'localhost',
    database: 'device_librarian',
    password: 'password',
    port: 5432,
  }
}
