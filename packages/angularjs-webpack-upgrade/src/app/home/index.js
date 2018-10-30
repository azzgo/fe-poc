module.exports = angular.module('app.home', [])
  .component('home', {
    template: require('./list/list.template.html'),
    controller: require('./list/list.controller.js')
  })
  .config(function ($stateProvider) {
    /*@ngInject*/
    $stateProvider
      .state('home', {
        url: '/home',
        component: 'home'
      })
      .state('homeDetail', {
        url: '/home/detail',
        template: require('./detail/detail.template.html'),
        controller: require('./detail/detail.controller.js')
      })
  }).name
