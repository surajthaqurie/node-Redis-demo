const htpp = require('http');
const app = require('./app');
const { dbConfig } = require('./lib/config/app.config')

const server = htpp.createServer(app);

const port = process.env.PORT || dbConfig.port;

server.listen(port, () => {
  console.log(`Listening on ${port} on ` + Date(new Date()));

});

process.on('SIGTERM', function () {
  server.close(function () {
    process.exit(0);
  });
});

module.exports = server;