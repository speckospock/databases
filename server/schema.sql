CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL,
  user int NOT NULL,
  room int NOT NULL,
  createdAt datetime NOT NULL,
  text varchar(240),

  PRIMARY KEY (id),
  FOREIGN KEY (user) REFERENCES users(id),
  FOREIGN KEY (room) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  id int NOT NULL,
  name varchar (20) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL,
  name varchar (20) NOT NULL,

  PRIMARY KEY (id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
