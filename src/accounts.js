'use strict';

const { flatten } = require('lodash');
const Promise = require('bluebird');
const api = require('./api');

function getPath(bmId) {
  if (!bmId) return 'me/adaccounts';
  return `${bmId}/owned_ad_accounts`;
}

exports = module.exports = function(token) {
  const accountsApi = {};

  accountsApi.insights = function(params) {
    return api.paginatedQuery({
      access_token: token,
      path: params.account + '/insights',
      params: params,
    });
  };
  accountsApi.all = function(params) {
    const path = getPath(params.business_manager_id);
    return api.paginatedQuery({
      access_token: token,
      path,
      params,
    });
  };
  accountsApi.one = function(accountId, params) {
    return api.query({
      params,
      access_token: token,
      path: accountId,
    });
  };
  return accountsApi;
};
