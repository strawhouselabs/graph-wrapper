const api = require('./api');

exports = module.exports = function(token) {
  const usersApi = {};
  usersApi.all = function(fields) {
    return api.query(
      { access_token: token,
        path: 'me',
        params: {fields: fields},
      }
    );
  };
  usersApi.getLongLivedToken = function(clientId, clientSecret) {
    return api.query({
      access_token: token,
      full_uri: 'https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=' +
      clientId + '&client_secret=' + clientSecret + '&fb_exchange_token=' + token,
    });
  };
  return usersApi;
};
