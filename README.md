CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
CREATE DATABASE device_renter;
\c device_renter

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(30),
  display_name VARCHAR(30),
  CONSTRAINT username_unique UNIQUE (username),
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT display_name_unique UNIQUE (display_name)
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
CREATE UNIQUE INDEX device_nickname ON devices(nickName);

ALTER TABLE devices ALTER COLUMN status SET DEFAULT 'available'
INSERT INTO users (name, email, role, password)
  VALUES ('Tony Stark', 'iron.man@email.com', 'admin', 'p@ssw0rd');
INSERT INTO devices (nickName, type, os, version)
  VALUES ('Little Giraffe', 'mobile', 'ios', '11');

INSERT INTO devices (nickName, type, os, version)
  VALUES ('SlimHippo', 'mobile', 'ios', '11');

curl -d "@new-user.json" -H "Content-Type: application/json" -X POST localhost:3001/users/create
