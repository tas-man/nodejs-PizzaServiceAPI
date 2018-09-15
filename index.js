/*
 * Main app file
 *
 */

// Dependencies
const server = require('./lib/server');

// App Container
let app = {};

// Init function
(app.init = function() {
  // Start server
  server.init();
})();

// Export App
module.exports = app;
