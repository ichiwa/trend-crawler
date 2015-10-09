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
  // trend_keyword
  sequelize.import('trend_keyword', function(sequelize, DataTypes){
    return sequelize.define('trend_keyword', {
      keyword: {
        type: Sequelize.STRING,
        unique: true
      },
      woeid:{
        type:Sequelize.BIGINT,
        validate: {
          isNumeric: true
        }
      },
      place:{
        type: Sequelize.STRING,
      }
    },{
      charset: 'utf8',
      timestamps: true,
      freezeTableName: true
    })
  });
  // trend_woeid
  var data = require('./initialize_db');
  sequelize.import('trend_woeid', function(sequelize, DataTypes){
    return sequelize.define(
      'trend_woeid', 
      {
        name: {
          type: Sequelize.STRING,
          unique: true
        },
        woeid:{
          type:Sequelize.BIGINT,
          unique: true,
          validate: {
            isNumeric: true
          }
        }
      },
      {
        charset: 'utf8',
        timestamps: true,
        freezeTableName: true,
        classMethods: {
          findRandomWoeid:function(){
            return sequelize.query('SELECT * FROM trend_woeid ORDER BY RAND() LIMIT 10;', {model:sequelize.models.trend_woeid});
          }
        }
      })
  });
  sequelize
    .sync({logging:console.log})
    .then(function(){
      // 初期データの追加
      for (var i = 0; i < data.length; i++){
        //sequelize.models.trend_woeid.create(data[i]);
      }
    });
  return sequelize;
})();
