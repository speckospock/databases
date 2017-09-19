const models = require('../models');

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

const sendResponse = (response, data, statusCode) => {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

const collectData = (request, callback) => {
  let data = '';
  request.on('data', chunk => data += chunk);
  request.on('end', () => callback(JSON.parse(data)));
};

//receives input from app -> routes
module.exports = {
  messages: {
    get: function (req, res) {
      //sendResponse(reponse, {results: /*result of querying DB*/}, 200);
      models.messages.get(req, (data) => {
        let results = {
          'results': data
        };
        sendResponse(res, results, 200);
      });
      //mental note: format results into object in callback
    }, // a function which handles a get request for all messages
    options: (req, res) => {
      sendResponse(res, null, 200);
      // console.log(JSON.stringify(req));
      // res.writeHead(200, headers);
      // res.end();
    },
    post: (req, res) => {
      collectData(req, (data) => models.messages.post(data));
      res.writeHead(201, headers);
      res.end();
      //collectData (pass on req, callback(message) => PUTs message in DB)
      //sendResponse back to client
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      //same as above but filter to include only messages from a user
    },
    post: function (req, res) {
      //exactly the same as above
    }
  }
};
