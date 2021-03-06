var getTrends = function(callback){
  var async = require('async');
  var sequelize = require('./../sequelize');
  var models = sequelize.models;
  
  var TWRestClient = require('./../lib/tw_rest_client');
  var twRestClient = new TWRestClient();
  twRestClient.initialize();
  
  models
  .trend_woeid
  .findRandomWoeid() 
  .then(function(trendWoeidArray){
    async.eachSeries(trendWoeidArray, 
      function(item, next){
        twRestClient.getTrend(item.woeid, function(err, response){
          if (err){
            return next(err);
          }
          var locations = response[0]["locations"][0];
          var trends = response[0]["trends"];
          
          async.eachSeries(trends, function(trend, next2){
            models.trend_keyword
              .findOne({where:{keyword:trend.name}})
              .then(function(trendKeyword){
                if (!trendKeyword){
                  models.trend_keyword.create({
                    keyword:trend.name,
                    woeid:locations.woeid,
                    place:locations.name
                  });
                }
                next2();
              }
            )
          }, function(err){
            next(err);
          })
        })
      },
      function done(err){
        callback(err);
      }
    )
  })
}
module.exports = getTrends;