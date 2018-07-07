module.exports = angular.module('aboutPage', [require('../../directives')])
  .controller('aboutCtrl', function ($scope) {
    /*@ngInject*/
    var vm = $scope
    vm.options = ['option1', 'option2']
    vm.selectValue = '';
  })
  .name

