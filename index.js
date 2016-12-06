"use strict";
const config = require('./src/api').config
const rp = require('request-promise');

var FB = function(token){
  var api = {};

  api.accounts = require('./src/accounts')(token);
  api.user = require('./src/user')(token);
  api.ads = require('./src/ads')(token);
  api.creatives = require('./src/creatives')(token);
  api.campaigns = require('./src/campaigns')(token);
  api.adSets = require('./src/ad_sets')(token);
  
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
      options.body = Object.assign({}, options.body, {access_token: token})
    }
    if(options.form){
      options.form = Object.assign({}, options.form, {access_token: token})
    }
    if(options.qs) {
      options.qs = Object.assign({}, options.qs, {access_token: token})
    }
    return rp(options);
  }
  return api;
};

/*
Export the module
 */
exports = module.exports = FB;
