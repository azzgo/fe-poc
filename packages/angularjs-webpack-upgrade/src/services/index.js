var downgradeInjectable = require('@angular/upgrade/static').downgradeInjectable
var DemoService = require('./demo.service.ts').DemoService


module.exports = angular.module('app.services', [])
  // .factory('demoSerive', require('./demo.servcie'))
  .factory('demoSerive', downgradeInjectable(DemoService))
  .name
