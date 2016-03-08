angular.module('treeApp')
  .controller('FormCtrl', function ($scope, featureModels) {
    
    $scope.newFeatureModel={title:"",description:"",tree:[],versions:[]};
    
    $scope.resetForm = function() {
        $scope.newFeatureModel.title = "";
        $scope.newFeatureModel.description = "";
    };
    
    $scope.addFeatureForm = function() {
        var v = {title:$scope.newFeatureModel.title,description:$scope.newFeatureModel.description,tree:[],versions:[]};
        var sameTitle = false;
        for (var i = 0; i < featureModels.list.length && !sameTitle; i++) {
            if($scope.newFeatureModel.title===featureModels.list[i].title){
                sameTitle=true;
            }
        }
        if(sameTitle){
            alert("You cannot use the same title in different feature models");
        }
        else{
            featureModels.add(v);
        }
        $scope.resetForm();
    };
  });
