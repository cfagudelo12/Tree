angular.module('treeApp')
  .controller('VersionsCtrl', function ($scope, featureModels) {
    $scope.currentFeatureModel=featureModels.currentFeatureModel;
  });


