var db = require('../db');

module.exports = {
  messages: {
    get: function (req, callback) {
      //pass along user
      db.readMessages(data => callback(data), req.username);

    }, // a function which produces all the messages
    post: function (req) {
      //pass along user, room, message
      db.writeMessage(req.text, req.username, req.roomname);
    } // a function which can be used to insert a message into the database
  },

  //dunno if we need below
  users: {
    // Ditto as above.
    get: function () {
      //pass along user (room?)
    },
    post: function () {
      //does not seem necessary at all
    }
  }
};
