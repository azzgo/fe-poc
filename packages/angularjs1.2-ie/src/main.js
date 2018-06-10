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
          templateUrl: 'home.html',
          controller: 'homeCtrl'
        })
        .when('/about', {
          templateUrl: 'about.html'
        })
        .otherwise({
          redirectTo: '/home'
        })

      $locationProvider.html5Mode(false)
    })

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementById('app'), [app.name])
})
