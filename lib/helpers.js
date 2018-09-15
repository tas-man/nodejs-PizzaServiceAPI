/*
 * General helpers and integration with third party APIs
 *
 */

// Dependencies
const crypto = require('crypto');
const conf = require('./config');
const querystring = require('querystring');
const https = require('https');


// Helpers Container
let helpers = {};


// Parse JSON string to object without throwing error
helpers.parseJsonToObject = function(str){
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch(e) {
    return {};
  }
};

// Validate email using regular expressions
helpers.validateEmail = function(email){
  let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
};


// Hash password
helpers.hashString = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    let hashed = crypto.createHmac('SHA256', conf.hashingSecret).update(str).digest('hex');
    return hashed;
  } else {
    return false;
  }
};

// Generate random string
helpers.generateRandomStr = function(len){
  len = typeof(len) == 'number' && len > 0 && len < 21 ? len : false;
  if(len){
    // Define allowed chars in token
    let allowedChars = 'abcdefghijklmnopqrstuvxyz0123456789';
    let str = '';

    for(i=1; i<=len; i++){
      let randomChar = allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
      str += randomChar;
    };
    return str;
  } else {
    return false;
  }
};

// Send email using MailGun API
helpers.notifyByMailGun = function(to, subject, body, callback){
  // Compose email
  let requestPayload = {
    'from' : 'admin@' + conf.mailGun_DomainName,
    'to' : to,
    'subject' : subject,
    'text' : body
  };
  let strPayload = querystring.stringify(requestPayload);

  // Create payment request parameters
  let requestParameters = {
    'protocol' : 'https:',
    'method' : 'POST',
    'hostname' : 'api.mailgun.net',
    'path' : '/v3/' + conf.mailGun_DomainName + '/messages',
    'headers' : {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : "Basic " + Buffer.from(conf.mailGun_apiKey).toString("base64")
    }
  };

  // Create request object
  let req = https.request(requestParameters, function(res){
    let statusCode = res.statusCode;
    if(statusCode == 200){
      callback(false);
    } else {
      callback(res.statusCode, {'Error' : 'Notification email could not be sent'});
    }
  });
  req.on('error', function(err){
    callback(400, {'Error' : e});
  });
  req.write(strPayload);
  req.end();
};

// Export module
module.exports = helpers;
