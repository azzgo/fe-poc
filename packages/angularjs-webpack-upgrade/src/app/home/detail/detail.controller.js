/*@ngInject*/
module.exports = function ($scope, $state){
  $scope.goBack = function () {
    $state.go('home')
  }
}
