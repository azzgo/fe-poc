module.exports = function ($scope) {
  /*@ngInject*/

  $scope.options1 = _.range(10)

  $scope.changeOptions = function () {
    $scope.options1 = Math.random() > 0.5 ? '春夏秋冬'.split('') : _.range(10)
  }

  $scope.select1 = 99
}
