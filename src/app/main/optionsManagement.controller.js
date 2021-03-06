/**
 * Created by RIGHJES on 5/20/2016.
 */
(function () {
  'use strict';

  angular
    .module('createShipment')
    .controller('OptionsManagementController', OptionsManagementController);

  /** @ngInject */
  function OptionsManagementController(shipmentTypesService) {
    var vm = this;

    vm.shipmentOptions = [];
    vm.checkOptionEdit = checkOptionEdit;
    vm.deleteOption = deleteOption;
    vm.updateOption = updateOption;
    activate();

    function activate() {
      getShipmentTypes();
    }

    function getShipmentTypes() {

      shipmentTypesService.getShipmentTypeOptions().then(
        function (response) {
          vm.shipmentOptions = response.options;
          _.forEach(vm.shipmentOptions, function (o) {
            o.noEdit = true;
          });
        }
      );
    }

    function updateOption(option) {
      shipmentTypesService.updateShipmentTypeOption(option.OptionId,option.Mode,option.Description,option.Route)
        .then(function(response){

        });
    }

    function deleteOption(option) {
      shipmentTypesService.deleteShipmentTypeOption(option.OptionId).then(function (response) {

      });
    }

    var currentOptionId = 0;

    function checkOptionEdit(option) {
      if (option.OptionId === currentOptionId) {
        option.noEdit = option.noEdit;
      } else {
        option.noEdit = !option.noEdit;
      }
      currentOptionId = option.OptionId;
    }

  }

})();
