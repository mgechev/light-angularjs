/* global Provider, DOMCompiler */

Provider.controller('TodoCtrl', function TodoCtrl($scope) {
  'use strict';
  $scope.todos = [];
  $scope.add = function () {
    $scope.todos.push($scope.todo);
    $scope.todo = '';
  };
});

DOMCompiler.bootstrap();
