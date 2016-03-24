angular.module('treeApp')
  .controller('FormCtrl', function ($scope, factory) {
    
    $scope.newFeatureModel={title:"",description:"",tree:[],versions:[]};
    
    $scope.resetForm = function() {
        $scope.newFeatureModel.title = "";
        $scope.newFeatureModel.description = "";
    };
    
    $scope.addFeatureFormController = function() {
        var v = {title:$scope.newFeatureModel.title,description:$scope.newFeatureModel.description,tree:[],versions:[]};
        var sameTitle = false;
        for (var i = 0; i < factory.currentUser.featureModelsList.length && !sameTitle; i++) {
            if($scope.newFeatureModel.title===factory.currentUser.featureModelsList[i].title){
                sameTitle=true;
            }
        }
        if(sameTitle){
            alert("You cannot use the same title in different feature models");
        }
        else{
            factory.addFeatureModel(v);
        }
        $scope.resetForm();
    };
  });
