module.exports = angular.module('aboutPage', [require('../../directives')])
  .controller('aboutCtrl', function ($scope) {
    /*@ngInject*/
    var vm = $scope
    vm.options = [
      {
        id: '1',
        text: 'option1'
      },
      {
        id: '2',
        text: 'option2'
      }
    ]
  })
  .name

