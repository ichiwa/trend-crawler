var util = require('util');

var TWRestClient = function(){
  this.config = require("config").get("twitter");
  this.trendUrl = 'https://api.twitter.com/1.1/trends/place.json?exclude=hashtags&id=%s';
}

TWRestClient.prototype.initialize = function(){
  var OAuth = require('oauth');
  this.oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    this.config.get('consumerKey'),
    this.config.get('consumerSecret'),
    '1.0A',
    null,
    'HMAC-SHA1'
  );
}

TWRestClient.prototype.getTrend = function(woeid, callback){
  this.oauth.get(
    util.format(this.trendUrl, woeid),
    this.config.get('accessToken'), 
    this.config.get('accessTokenSecret'), 
    function (e, data, res){
      if (e) {
        return callback(e);
      }
      var response = JSON.parse(data);
      callback(null, response);
  });
}

module.exports = TWRestClient;