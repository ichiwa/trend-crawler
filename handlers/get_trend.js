/**
 * trendの取得
 */
module.exports = function(request, reply){
  require('./../lib/get_trend_core')(function(e){
    if (e){
      reply(e);
    } else {
      reply("success");
    }
  })
}

