var app = angular.module('app', [
  'ngRoute',
  require('./app/home/home'),
  require('./app/about/about')
])
  .config(
    /**
     * @param {ng.route.IRouteProvider} $routeProvider
     * @param {ng.ILocationProvider} $locationProvider
     */
    function ($routeProvider, $locationProvider) {
    /*@ngInject*/
      $routeProvider
        .when('/home', {
          template: require('./app/home/home.html'),
          controller: 'homeCtrl'
        })
        .when('/about', {
          template: require('./app/about/about.html'),
          controller: 'aboutCtrl'
        })
        .otherwise({
          redirectTo: '/home'
        })

      $locationProvider.html5Mode(false)
    })

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementById('app'), [app.name])
})
