/*@ngInject*/
module.exports = function ($scope) {

  $scope.options1 = _.range(10)

  $scope.changeOptions = function () {
    $scope.options1 = Math.random() > 0.5 ? '春夏秋冬'.split('') : _.range(10)
  }

  $scope.select1 = 99

  $scope.area = {
    cityList: [
      {
        id: '140100',
        name: '太原市'
      },
      {
        id: '140500',
        name: '晋城市'
      },
      {
        id: '140600',
        name: '朔州市'
      },
      {
        id: '141100',
        name: '吕梁市'
      }
    ],
    isNational: false
  }
}
