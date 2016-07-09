"use strict";

const api = require('./api');

exports = module.exports = function(token) {
  const campaignsApi = {};

  campaignsApi.insights = function(params) {
    if(!params.fields) {
      params.fields = 'app_store_clicks,canvas_avg_view_percent,canvas_avg_view_time,clicks,cost_per_estimated_ad_recallers,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cost_per_unique_inline_link_click,cpc,cpm,cpp,ctr,deeplink_clicks,estimated_ad_recall_rate,estimated_ad_recall_rate_lower_bound,estimated_ad_recall_rate_upper_bound,frequency,impressions,inline_link_clicks,inline_link_click_ctr,inline_post_engagement,reach,social_clicks,social_impressions,social_reach,spend,unique_clicks,unique_ctr,unique_impressions,unique_inline_link_clicks,unique_inline_link_click_ctr,unique_link_clicks_ctr,unique_social_clicks,unique_social_impressions,website_clicks,date_start,date_stop,buying_type,campaign_id,actions,unique_actions,total_actions,total_unique_actions,total_action_value,call_to_action_clicks,cost_per_total_action,cost_per_action_type,cost_per_10_sec_video_view,cost_per_unique_action_type,website_ctr,video_avg_sec_watched_actions,video_avg_pct_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,video_p100_watched_actions,video_complete_watched_actions,video_10_sec_watched_actions,video_15_sec_watched_actions,video_30_sec_watched_actions';
    }
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
