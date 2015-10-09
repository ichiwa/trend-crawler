module.exports = function(){
  require('./../lib/get_trend_core')(function(err){
    if (err){
      console.error(err);
    } else {
      console.log("success");
    }
  })  
};