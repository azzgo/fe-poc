module.exports = angular.module('app.home', [])
  .config(function ($stateProvider) {
    /*@ngInject*/
    $stateProvider
      .state('home', {
        url: '/home',
        template: require('./list/list.template.html'),
        controller: require('./list/list.controller.js')
      })
      .state('home.detail', {
        url: '/detail',
        template: require('./detail/detail.template.html'),
        controller: require('./detail/detail.controller.js')
      })
  }).name
