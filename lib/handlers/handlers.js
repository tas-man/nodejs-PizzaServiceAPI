/*
 * Request Handlers
 *
 */

// Dependencies
const _users  = require('./userHandlers');
const _tokens = require('./tokenHandlers');
const _items  = require('./itemHandlers');
const _carts  = require('./cartHandlers');
const _orders = require('./orderHandlers');


// Handlers Container
let handlers = {};

/************ USERS ***************************************/
handlers.users = function(data, callback){
  let acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    _users[data.method](data, callback);
  } else {
    callback(405); // Method not allowed
  }
};

/************ TOKENS **************************************/
handlers.tokens = function(data, callback){
  let acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    _tokens[data.method](data, callback);
  } else {
    callback(405); // Method not allowed
  }
};

/************ ITEMS ***************************************/
handlers.items = function(data, callback){
  let acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    _items[data.method](data, callback);
  } else {
    callback(405); // Method not allowed
  }
};

/************ CARTS ***************************************/
handlers.carts = function(data, callback){
  let acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    _carts[data.method](data, callback);
  } else {
    callback(405); // Method not allowed
  }
};

/************ ORDERS ***************************************/
handlers.orders = function(data, callback){
  let acceptableMethods = ['post', 'get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    _orders[data.method](data, callback);
  } else {
    callback(405); // Method not allowed
  }
};

/************ PING *****************************************/
handlers.ping = function(data, callback){
  callback(200);
};
/************ NOT FOUND ************************************/
handlers.notFound = function(data, callback){
  callback(404);
};

// Export module
module.exports = handlers;
