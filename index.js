"use strict";
const config = require('./src/api').config
const rp = require('request-promise');

var FB = function(options){
  var api = {};

  api.accounts = require('./src/accounts')(options);
  api.user = require('./src/user')(options);
  api.ads = require('./src/ads')(options);
  api.creatives = require('./src/creatives')(options);
  api.campaigns = require('./src/campaigns')(options);
  api.adSets = require('./src/ad_sets')(options);
  
  // sets some defults, and by specificing 'path' allows you to use the right api version
  api.raw = function(newOptions) {
    const options = Object.assign({},{
      json: true,
    }, newOptions);
    if(options.path) {
      options.uri = config.BASE_URL + options.path;
      delete options.path;
    }
    if(options.body){
      options.body = Object.assign({}, options.body, {access_token: options})
    }
    if(options.qs) {
      options.qs = Object.assign({}, options.qs, {access_token: options})
    }
    return rp(options);
  }
  return api;
};

/*
Export the module
 */
exports = module.exports = FB;
