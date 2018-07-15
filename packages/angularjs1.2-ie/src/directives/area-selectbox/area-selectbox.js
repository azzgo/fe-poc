var area = require('./areaData')

/**
 * @returns {ng.IDirective}
 */
module.exports = function ($timeout) {
  /*@ngInject*/

  return {
    require: '^ngModel',
    scope: {
      disabled: '=ngDisabled'
    },
    template: require('./area-selectbox.html'),
    link: function (scope, elm, attr, ngModel) {
      var vm = scope
      init()

      function init () {
        vm.areaOptions = []
        vm.provinceList = []
        vm.provinceListFilter = ''
        vm.cityList = []
        vm.cityListFilter = ''
        vm.selectedCityListOptions = []
        vm.selectedCityList = []
        vm.selectedCityListFilter = ''
        vm.isNational = false

        vm.filterProvinceOptions = filterProvinceOptions
        vm.filterCityOptions = filterCityOptions
        vm.filterSelectCityOptions = filterSelectCityOptions
        vm.moveSelected = moveSelected
        vm.moveAll = moveAll
        vm.removeSelected = removeSelected
        vm.removeAll = removeAll
        vm.updateNgModel = updateNgModel

        ngModel.$render = function () {
          var area = ngModel.$viewValue
          vm.selectedCityListOptions = area.cityList
          vm.isNational = area.isNational
        }

        $timeout(function () {
          vm.provinceList = [area[0]]
          vm.areaOptions = area
        }, 500)
      }


      function filterProvinceOptions (filter) {
        return _.filter(vm.areaOptions, function (item) {
          return item.name.indexOf(filter) !== -1
        })
      }

      function filterCityOptions (filter) {
        var filteredCityList = _.chain(vm.provinceList).map(function (item) {
          return item.cityList
        }).flatten().filter(function (item) {
          return _.findIndex(vm.selectedCityListOptions, function (selectedItem) {
            return selectedItem.id === item.id
          }) === -1
        }).value()

        return _.filter(filteredCityList, function (item) {
          return item.name.indexOf(filter) !== -1
        })
      }

      function filterSelectCityOptions (filter) {
        return _.filter(vm.selectedCityListOptions, function (item) {
          return item.name.indexOf(filter) !== -1
        })
      }


      function moveSelected () {
        vm.selectedCityListOptions = vm.selectedCityListOptions.concat(vm.cityList)
        updateNgModel()
      }

      function moveAll () {
        vm.selectedCityListOptions = vm.selectedCityListOptions.concat(filterCityOptions(vm.cityListFilter))
        updateNgModel()
      }

      function removeSelected () {
        vm.selectedCityListOptions = _.filter(vm.selectedCityListOptions, function (item){
          return _.findIndex(vm.selectedCityList, function (selectedOption) {
            return selectedOption.id === item.id
          }) === -1
        })
        updateNgModel()
      }

      function removeAll () {
        vm.selectedCityListOptions = []
        updateNgModel()
      }

      function updateNgModel () {
        var area = {
          cityList: vm.selectedCityListOptions,
          isNational: vm.isNational
        }
        ngModel.$setViewValue(area)
      }
    }
  }
}
