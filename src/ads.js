"use strict";

const api = require('./api');

exports = module.exports = function(token) {
  const adsApi = {};
  adsApi.all = function all(params, campaignId) {
    return api.paginatedQuery(
      { access_token: token,
        path: campaignId + '/ads',
        params: params,
      }
    );
  };
  return adsApi;
};
