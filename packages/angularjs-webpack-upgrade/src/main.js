require('styles/index.less')

angular
  .module('app', [
    'ui.router',
    'localytics.directives',
    require('./app/home'),
    require('./app/about'),
    require('./directives'),
    require('./services')
  ])
  .config(function ($urlRouterProvider) {
    /*@ngInject*/
    $urlRouterProvider.otherwise('home')
  })

// angular.element(document).ready(function () {
//   angular.bootstrap(document.getElementById('app'), [app.name])
// })
