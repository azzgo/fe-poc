require('styles/index.less')

var app = angular.module('app', [
  'ui.router',
  'localytics.directives',
  require('./app/home'),
  require('./app/about'),
  require('./directives')
])
  .config(
    function ($urlRouterProvider) {
    /*@ngInject*/
      $urlRouterProvider.otherwise('home')
    })

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementById('app'), [app.name])
})
