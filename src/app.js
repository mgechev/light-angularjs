/* global Provider, DOMCompiler */
function TodoCtrl($scope) {
  'use strict';
  $scope.todos = [];
  $scope.add = function () {
    $scope.todos.push($scope.todo);
    $scope.todo = '';
  };
}

Provider.controller('TodoCtrl', TodoCtrl);

DOMCompiler.bootstrap();
