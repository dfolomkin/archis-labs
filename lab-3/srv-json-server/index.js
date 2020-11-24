var jsonServer = require('json-server');
var multipart = require('connect-multiparty');

var server = jsonServer.create();
var middlewares = jsonServer.defaults();
var multipartMiddleware = multipart();

server.use(middlewares);
// server.use(jsonServer.bodyParser);
server.use(multipartMiddleware);

var router = jsonServer.router('./db.json');

server.use('/api', router);

var port = 3017;

server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});
