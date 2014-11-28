Provider.directive('ngl-controller', function () {
  'use strict';
  return {
    scope: true,
    link: function (el, scope, exp) {
      var ctrl = Provider.get(exp + Provider.CONTROLLERS_SUFFIX);
      Provider.invoke(ctrl, { $scope: scope });
    }
  };
});

