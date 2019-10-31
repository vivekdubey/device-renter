CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
CREATE DATABASE device_renter;
\c device_renter

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  role VARCHAR(30),
  password VARCHAR(30)
);

CREATE TABLE devices (
  ID SERIAL PRIMARY KEY,
  nickName VARCHAR(30),
  type VARCHAR(30),
  os VARCHAR(30),
  version VARCHAR(30),
  authorizer VARCHAR(30),
  status VARCHAR(30),
  borrower_email VARCHAR(30),
  borrowed_date timestamp
);

CREATE UNIQUE INDEX user_email ON users(email);

INSERT INTO users (name, email, role, password)
  VALUES ('Tony Stark', 'iron.man@email.com', 'admin', 'p@ssw0rd');
INSERT INTO devices (nickName, type, os, version)
  VALUES ('Little Giraffe', 'mobile', 'ios', '11');

INSERT INTO devices (nickName, type, os, version)
  VALUES ('SlimHippo', 'mobile', 'ios', '11');

curl -d "@new-user.json" -H "Content-Type: application/json" -X POST localhost:3001/users/create
