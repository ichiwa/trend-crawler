/**
 * trendの取得
 */
module.exports = function(request, reply){
  getTrends(function(e){
    if (e){
      reply(e);
    } else {
      reply("success");
    }
  })
}

var getTrends = function(callback){
  var config = require('config');
  var twitterConfig = config.get('twitter');
  var sequelize = server.app.sequelize;
  var models = sequelize.models;
  
  var OAuth = require('oauth');
  var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      twitterConfig.get('consumerKey'),
      twitterConfig.get('consumerSecret'),
      '1.0A',
      null,
      'HMAC-SHA1'
  );
  oauth.get(
    'https://api.twitter.com/1.1/trends/place.json?id=24865671&exclude=hashtags',
    twitterConfig.get('accessToken'), 
    twitterConfig.get('accessTokenSecret'), 
    function (e, data, res){
      if (e) {
        return callback(e);
      }
      var response = JSON.parse(data);
      var trends = response[0]["trends"];
      for (var i = 0; i < trends.length; i++){
        var name = trends[i].name;
        console.log(name);
      }
      callback();
  });  
}