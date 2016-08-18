"use strict";

var FB = function(options){
  var api = {};

  api.accounts = require('./src/accounts')(options);
  api.user = require('./src/user')(options);
  api.ads = require('./src/ads')(options);
  api.creatives = require('./src/creatives')(options);
  api.campaigns = require('./src/campaigns')(options);
  api.adSets = require('./src/ad_sets')(options);

  return api;
};

/*
Export the module
 */
exports = module.exports = FB;