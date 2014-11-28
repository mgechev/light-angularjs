Provider.service('interval', function ($rootScope) {
  'use strict';
  return function (fn, timeout) {
    setInterval(function () {
      fn();
      $rootScope.$digest();
    }, timeout);
  };
});

