angular.module('treeApp')
  .controller('MainCtrl', function ($scope, featureModels) {
    
    $scope.featureModels = featureModels.list;
    
    $scope.removeFeatureModel = function (index) {
        featureModels.remove(index);
    };
    
    $scope.selectFeatureModel = function (index) {
        featureModels.select(index);
    };
  });
