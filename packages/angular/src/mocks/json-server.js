var jsonServer = require('json-server');
var server = jsonServer.create();
var path = require('path');
var router = jsonServer.router(path.join(__dirname, 'db.json'));
var middlewares = jsonServer.defaults();
server.use(middlewares);

server.use(jsonServer.bodyParser);

var token = 'jwt_token';

function isAuthorized(req) {
  authorization_token = 'Bearer ' + token;
  if ( req.path === '/auth' || req.headers.authorization === authorization_token) {
    return true;
  }
  return false;
}

server.all('/auth', function(req, res) {
  return res.json({
    token: token
  })
})

server.use(function (req, res, next) {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
})

server.use(router);

server.listen(3000, function () {
  console.log('JSON Server is running')
});
