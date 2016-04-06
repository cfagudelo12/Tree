angular.module('treeApp')
  .controller('MainCtrl', function ($scope, factory) {
    $scope.featureModels = factory.featureModels;
    
    $scope.selectFeatureModel = function (index) {
        factory.selectFeatureModel(index);
    };
  });
