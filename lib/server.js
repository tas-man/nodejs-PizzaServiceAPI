/*
 * Server tasks
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const util = require('util');
const debug = util.debuglog('server');
const conf = require('./config');
const handlers = require('./handlers/handlers');
const helpers = require('./helpers');

// Server Container
let server = {};

// Instantiate server
server.httpSrv = http.createServer(function(req, res){
  server.genServer(req, res);
});

// Generic server logic, (HTTPS support may be easily added)
server.genServer = function(req, res){
  // Get url, path, query string, method and headers from request
  const pUrl = url.parse(req.url, true);
  const path = pUrl.pathname;
  const trimPath = path.replace(/^\/+|\/+$/g, '');
  const queryStringObj = pUrl.query;
  const method = req.method.toLowerCase();
  const headers = req.headers;

  // Get payload
  const decoder = new stringDecoder('utf8');
  let buf = '';
  // Eventhandler: Incoming data
  req.on('data', function(data){
    // Append data to buffer
    buf += decoder.write(data);
  });
  // Eventhandler: Data stream ended
  req.on('end', function(){
    // Stop reading data to buffer
    buf += decoder.end();
    // Acquire appropriate request handler
    const selectedHandler = typeof(server.router[trimPath]) !== 'undefined' ? server.router[trimPath] : handlers.notFound;
    // Gather data for handlers
    const data = {
      'trimmed' : trimPath,
      'queryStringObj' : queryStringObj,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buf)
    }

    // Route request to handler
    selectedHandler(data, function(statusCode, payload){
      // Take status code and payload from handler or default to 200 and empty object
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      payload = typeof(payload) == 'object' ? payload : {};

      const payloadStr = JSON.stringify(payload);
      // Return response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadStr);

      // In case of 200 response => print GREEN, otherwise print RED
      if(statusCode == 200){
       debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimPath+' '+statusCode);
      } else {
       debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimPath+' '+statusCode);
      }
    });
  });
};

// Define request router
server.router = {
  'users' : handlers.users,
  'tokens' : handlers.tokens,
  'items' : handlers.items,
  'carts' : handlers.carts,
  'orders' : handlers.orders,
  'ping' : handlers.ping
}

// Init script
server.init = function(){
  // Start server
  server.httpSrv.listen(conf.httpPort, function() {
    console.log('\x1b[36m%s\x1b[0m','Server is listening on port '+conf.httpPort);
  });
};


// Export server
module.exports = server;
