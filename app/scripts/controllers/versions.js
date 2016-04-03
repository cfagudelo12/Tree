angular.module('treeApp')
  .controller('VersionsCtrl', function ($scope, factory) {
    $scope.featureModel=factory.featureModel;
  });


