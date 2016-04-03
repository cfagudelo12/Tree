angular.module('treeApp')
  .controller('FormCtrl', function ($scope, factory) {

    $scope.resetForm = function() {
        $scope.title = "";
        $scope.description = "";
    };
    
    $scope.addFeatureFormController = function() {
        //title:$scope.title,description:$scope.description,tree:[],versions:[],contributors:[],author:factory.currentUser.username;
        factory.addFeatureModel($scope.title, $scope.description);
        $scope.resetForm();
    };
  });
