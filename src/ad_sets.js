"use strict";

const api = require('./api');

exports = module.exports = function(token) {
  const adSetsApi = {};
  adSetsApi.all = function(params, parentId) {
    return api.paginatedQuery(
      { access_token: token,
        path: parentId + '/adsets',
        params: params,
      }
    );
  };
  return adSetsApi;
};
