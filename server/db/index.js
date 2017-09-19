const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';

let id;

mongoClient.connect(url, (err, db) => {
  db.createCollection('messages', (err, collection) => {
    collection.find().sort({objectId: 1}).toArray((err, documents) => {
      id = documents[documents.length -1].objectId + 1;
    });
  });
});

exports.readMessages = (callback, user = null) => {
  mongoClient.connect(url, (err, db) => {
    db.createCollection('messages', (err, collection) => {
      if (!user) {
        collection.find().sort({objectId: 1}).toArray((err, documents) => {
          console.log("READ: ", documents);
          callback(documents);
          db.close();
        });
      } else {
        collection.find({username: user}).sort({objectId: 1}).toArray((err, documents) => {
          console.log("READ: ", documents);
          callback(documents);
          db.close();

        });
      }
    });
  });
};

exports.writeMessage = (message = '', username = 'anonymous', roomname = 'lobby') => {
  mongoClient.connect(url, (err, db) => {
    db.createCollection('messages', (err, collection) => {
      collection.insert({username: username, text: message, roomname: roomname, objectId: id++});
      console.log('inserted!!! HEEHEE');
      // exports.readMessages((x) => x);
      db.close();
    });
  });
};

/*

/////////////////
//// MONGODB ////
/////////////////

const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';

let id;

mongoClient.connect(url, (err, db) => {
  db.createCollection('messages', (err, collection) => {
    collection.find().sort({objectId: 1}).toArray((err, documents) => {
      id = documents[documents.length -1].objectId + 1;
    });
  });
});

exports.readMessages = (callback, user = null) => {
  mongoClient.connect(url, (err, db) => {
    db.createCollection('messages', (err, collection) => {
      if (!user) {
        collection.find().sort({objectId: 1}).toArray((err, documents) => {
          console.log("READ: ", documents);
          callback(documents);
          db.close();
        });
      } else {
        collection.find({username: user}).sort({objectId: 1}).toArray((err, documents) => {
          console.log("READ: ", documents);
          callback(documents);
          db.close();

        });
      }
    });
  });
};

exports.writeMessage = (message = '', username = 'anonymous', roomname = 'lobby') => {
  mongoClient.connect(url, (err, db) => {
    db.createCollection('messages', (err, collection) => {
      collection.insert({username: username, text: message, roomname: roomname, objectId: id++});
      console.log('inserted!!! HEEHEE');
      // exports.readMessages((x) => x);
      db.close();
    });
  });
};

///////////////////////////
//// SEQUELIZE + MYSQL ////
///////////////////////////

var mysql = require('mysql');
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


///////////////////////////////////////////////////
//// VANILLA SQL IMPLEMENTATION (NO SEQUELIZE) ////
///////////////////////////////////////////////////

var mysql = require('mysql');

const chat = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'plantlife',
  database: 'chat'
});

exports.readMessages = (callback, user = null) => {

  if (user) {
    chat.query('SELECT * FROM `messages` WHERE `username` = "'+ user + '"', (err, results) => {
      if (err) {
        throw err;
      }
      callback(results);

    });
  } else {
    chat.query('SELECT * FROM `messages`', (err, results) => {
      if (err) {
        throw err;
      }
      callback(results);

    });
  }
};

exports.readMessages((results) => { console.log(results); });
exports.writeMessage = (message, username = 'anonymous', roomname = 'lobby') => {
  //add column to the messages DB table
  chat.query('INSERT INTO `messages` (username, roomname, text) VALUES ("' + username + '", "'+ roomname + '", "' + message +'")', (err, results) => {
    if (err) {
      throw err;
    }
  });
};

*/
