"use strict";

var FB = function(options){
  var api = {};

  api.accounts = require('./core/accounts')(options);
  api.user = require('./core/user')(options);
  api.ads = require('./core/ads')(options);
  api.creatives = require('./core/creatives')(options);
  api.campaigns = require('./core/campaigns')(options);

  return api;
};

/*
Export the module
 */
exports = module.exports = FB;


