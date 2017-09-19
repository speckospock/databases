var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

/*

##################
#from mysql docs:#
##################

The simplest form of .query() is .query(sqlString, callback), where a SQL string is the first argument and the second is a callback:

connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

*/

var db = new Sequelize('chat', 'root', 'plantlife');

var Message = db.define('messages', {
  objectId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  roomname: Sequelize.STRING,
  text: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

exports.readMessages = (callback, user = null) => {
  Message.sync()
  .then(() => {
    if (user) {
      return Message.findAll({ where: {username: user}});
    } else {
      return Message.findAll();
    }
  })
  .then(messages => callback(messages))
  .catch((err) => console.error(err));
};

exports.writeMessage = (message, username = 'anonymous', roomname = 'lobby') => {
  //add column to the messages DB table
  Message.sync()
  .then(() => {
    Message.create({username: username, roomname: roomname, text: message});
  })
  .then(result => result)
  .catch((err) => console.error(err));
};

// const chat = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'plantlife',
//   database: 'chat'
// });

// exports.readMessages = (callback, user = null) => {
//
//   if (user) {
//     chat.query('SELECT * FROM `messages` WHERE `username` = "'+ user + '"', (err, results) => {
//       if (err) {
//         throw err;
//       }
//       callback(results);
//
//     });
//   } else {
//     chat.query('SELECT * FROM `messages`', (err, results) => {
//       if (err) {
//         throw err;
//       }
//       callback(results);
//
//     });
//   }
// };

// exports.readMessages((results) => { console.log(results); });
// exports.writeMessage = (message, username = 'anonymous', roomname = 'lobby') => {
//   //add column to the messages DB table
//   chat.query('INSERT INTO `messages` (username, roomname, text) VALUES ("' + username + '", "'+ roomname + '", "' + message +'")', (err, results) => {
//     if (err) {
//       throw err;
//     }
//   });
// };
