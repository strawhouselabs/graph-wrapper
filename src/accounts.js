"use strict";

const api = require('./api');

exports = module.exports = function(token) {
  const accountsApi = {};

  accountsApi.insights = function(params) {
    return api.paginatedQuery(
      { access_token: token,
        path: params.account + '/insights',
        params: params}
    );
  };
  accountsApi.all = function(params) {
    return api.paginatedQuery(
      { access_token: token,
        path: 'me/adaccounts',
        params: params,
      }
    );
  };
  campaignsApi.one = function(accountId, params) {
    return api.query(
      { params,
        access_token: token,
        path: accountId,
      }
    );
  };
  return accountsApi;
};
