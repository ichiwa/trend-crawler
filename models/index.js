var Sequelize = require('sequelize');
var config = require('config');
var sequelizeConfig = config.get('sequelize');

module.exports = (function(){
  var sequelize = new Sequelize(
    sequelizeConfig.get('database'),
    sequelizeConfig.get('username'),
    sequelizeConfig.get('password'),
    {
      host : 'localhost',
      dialect: 'mariadb'
    }
  )
  // models
  sequelize.import('TrendKeyword', function(sequelize, DataTypes){
    return sequelize.define('trend_keyword', {
      keyword: Sequelize.STRING
    },{
      charset: 'utf8',
      timestamps: true,
    })
  });
  sequelize.sync({logging:console.log});
  return sequelize;
})();