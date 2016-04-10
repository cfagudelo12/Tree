angular.module('treeApp')
  .controller('FormCtrl', function ($scope, factory) {

    $scope.resetForm = function() {
        $scope.title = "";
        $scope.description = "";
        $scope.rootTitle = "";
    };
    
    $scope.addFeatureFormController = function() {
        factory.addFeatureModel($scope.title, $scope.description, $scope.rootTitle);
        $scope.resetForm();
    };
  });
