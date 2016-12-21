"use strict";
const Promise = require('bluebird');
const rp = require('request-promise');

const API_VERSION = 'v2.7';
const BASE_URL = 'https://graph.facebook.com/' + API_VERSION + '/';

exports.config = {
  BASE_URL,
};

/**
 options can contain params, fields, and must contain path and access_token
 */
exports.query = function(options) {
  // if the full uri was specific, just query on that
  if (options.full_uri) {
    const query = {
      uri: options.full_uri,
      json: true,
    };
    return rp(query);
  }

  const qs = {};

  // make sure we were given a path
  if (!options.path) {
    return Promise.reject(new Error('You must defined a query path to use the api'));
  }
  // make sure we were given a token
  if (!options.access_token) {
    return Promise.reject(new Error('You must specify an access token in the options to use the api'));
  } else {
    qs.access_token = options.access_token;
  }

  let params = options.params;
  // make sure params are actually set to something so we can check deep fields later
  if (!options.params) {
    params = {};
  }
  if(params.limit) {
    qs.limit = params.limit;
  }
   if(params.level) {
    qs.level = params.level;
  }
  // set fields from options.params.fields if set
  if (params.fields) {
    qs.fields = params.fields;
  }
  if (params.filtering) qs.filtering = params.filtering;

  if (params.resolution) {
    // set resolution
    if (params.resolution === 'hourly') {
      qs.breakdowns = 'hourly_stats_aggregated_by_advertiser_time_zone';
    } else if ( params.resolution === 'daily') {
      // pretty sure if we leave it blank it defaults here
    }
    // date start and date endinstal
  }
  if (params.date_start && params.date_end) {
    qs.time_range = {};
    qs.time_range.until = params.date_end;
    qs.time_range.since = params.date_start;
  }

  const query = {
    uri: BASE_URL + options.path,
    qs: qs,
    json: true,
  };
  return rp(query);
};

exports.paginatedQuery = (options, currentData) => {
  let data = currentData;
  // initialize data if this is the first time this recursive function has run
  if (!data) data = [];

  // recursive function
  return exports.query(options).then((response) => {
    if (!response.paging || !response.paging.next) {
      return data.concat(response.data);
    }
    options.full_uri = response.paging.next;
    return exports.paginatedQuery(options, data.concat(response.data));
  })
};
