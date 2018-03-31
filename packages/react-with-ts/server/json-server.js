const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

let token = '_' + Math.random().toString(36).substr(2, 20);

function isAuthorized(req) {
  authorization_token = 'Bearer ' + token;
  if ( req.path === '/auth' || req.headers.authorization === authorization_token) {
    return true;
  }
  return false;
}

server.post('/auth', function(req, res) {
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
  console.log('JSON Server is running: http://127.0.0.1:3000')
});
