var mysql = require('mysql');

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

const chat = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'plantlife',
  database: 'chat'
});


exports.readMessages = (callback, user = null) => {
  //build a query string
  // chat.connect();
  let blah = user;
  if (user) {
    chat.query(`SELECT * FROM \`messages\` WHERE \`username\` = "${user}"`, (err, results) => {
      if (err) {
        throw err;
      }
      chat.end((err) => {
        if (err) {
          throw err;
        }
        callback(results);
      });
    });
  } else {
    chat.query('SELECT * FROM `messages`', (err, results) => {
      if (err) {
        throw err;
      }
      chat.end((err) => {
        if (err) {
          throw err;
        }
        // console.log(results);
        callback(results);
      });
    });
  }
};

exports.writeMessage = (message, username = 'anonymous', roomname = 'lobby') => {
  //add column to the messages DB table
  chat.query(`INSERT INTO \`messages\` (username, roomname, text) VALUES ("${username}", "${roomname}", "${message}")`, (err, results) => {
    if (err) {
      throw err;
    }
    chat.end((err) => {
      if (err) {
        throw err;
      }
      // check what SQL spits out
      return;
    });
  });
};
