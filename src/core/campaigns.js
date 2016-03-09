"use strict";

const api = require('./api');

exports = module.exports = function(token) {
  const campaignsApi = {};

  campaignsApi.insights = function(params) {
    params.fields = 'spend';
    return api.query(
      { access_token: token,
        path: params.campaign + '/insights',
        params: params}
    );
  };
  campaignsApi.all = function(params, accountId) {
    return api.paginatedQuery(
      { access_token: token,
        path: accountId + '/campaigns',
        params: params,
      }
    );
  };
  campaignsApi.name = function(campaignId) {
    return api.query(
      { access_token: token,
        path: campaignId,
        params: { fields: 'name' },
      }
    );
  };
  return campaignsApi;
};
