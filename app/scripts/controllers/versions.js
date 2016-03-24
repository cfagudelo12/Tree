angular.module('treeApp')
  .controller('VersionsCtrl', function ($scope, factory) {
    $scope.currentFeatureModel=factory.currentUser.currentFeatureModel;
  });


