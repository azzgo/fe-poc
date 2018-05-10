const pathToRegex = require('path-to-regexp')
if (location.pathname.match(pathToRegex('/'))) {
  require('./controllers/home')
}
