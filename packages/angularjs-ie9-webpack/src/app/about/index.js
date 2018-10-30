module.exports = angular.module('app.about', [])
  .config(function ($stateProvider) {
  /*@ngInject*/
    $stateProvider
      .state('about', {
        url: '/about',
        template: require('./about.template.html'),
        controller: require('./about.controller.js')
      })
  }).name
