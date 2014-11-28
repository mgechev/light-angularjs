Provider.controller('TodoCtrl', function MainCtrl($scope) {
  'use strict';
  $scope.todos = [];
  $scope.add = function () {
    $scope.todos.push($scope.todo);
    $scope.todo = '';
  };
});

DOMCompiler.bootstrap();
