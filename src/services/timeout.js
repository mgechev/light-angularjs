Provider.service('timeout', function ($rootScope) {
  'use strict';
  return function (fn, timeout) {
    setTimeout(function () {
      fn();
      $rootScope.$digest();
    }, timeout);
  };
});

