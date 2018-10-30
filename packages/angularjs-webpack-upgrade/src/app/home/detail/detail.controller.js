module.exports = function ($scope, $state){
  /*@ngInject*/
  $scope.goBack = function () {
    $state.go('home')
  }
}
