"use strict";

const api = require('./api');

exports = module.exports = function(token) {
  const creativesApi = {};
  creativesApi.all = function all(params, adId) {
    return api.paginatedQuery(
      { access_token: token,
        path: adId + '/adcreatives',
        params: params,
      }
    );
  };
  return creativesApi;
};
