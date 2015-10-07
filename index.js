var Hapi = require('hapi');
var Good = require('good');
var Hoek = require('hoek');
var config = require('config');
var sequelizeConfig = config.get('sequelize');

server = new Hapi.Server();
server.connection({ port: config.get("port") });

server.register(require('vision'), function (err) {
  Hoek.assert(!err, err);
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  });
});

// global objecs
server.app = {}
server.app.sequelize = require('./models');

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index');
  }
});

server.route({
  method: 'GET',
  path: '/get_trend',
  handler:require('./handlers/get_trend')
})

server.register({
    register: Good,
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
            response: '*',
            log: '*'
        }
      }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});