CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  objectId int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  roomname varchar(20),
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  text varchar(240),

  PRIMARY KEY (objectId)
  -- auto increment id
);

/* Create other tables and define schemas for them here! */
-- CREATE TABLE rooms (
--   id int NOT NULL,
--   name varchar(20) NOT NULL,
--   PRIMARY KEY (id)
-- );
--
-- CREATE TABLE users (
--   id int NOT NULL,
--   name varchar(20) NOT NULL,
--   PRIMARY KEY (id)
-- );



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
