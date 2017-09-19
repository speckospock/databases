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

var chat = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'plantlife',
  database: 'chat'
});

chat.connect((err) => {
  if (err) {
    throw err;
  }
  //do stuff;
});

var readMessages = (room = 'lobby') => {
  //get a message (or messages?) from the messages DB table
  return messages;
};

var readUsers = (user = 'anonymous') => {
  //return a user (or users?) from the users DB table
  return users;
};

var writeMessage = (message, user = 'anonymous', room = 'lobby') => {
  //add column to the messages DB table
};

var writeUser = (user) => {
  //save user to the users DB table
};
