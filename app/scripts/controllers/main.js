angular.module('treeApp')
  .controller('MainCtrl', function ($scope, factory) {
    $scope.featureModels = factory.featureModels;
    
    $scope.removeFeatureModel = function (index) {
        factory.removeFeatureModel(index);
    };
    
    $scope.selectFeatureModel = function (index) {
        factory.selectFeatureModel(index);
    };
  });
