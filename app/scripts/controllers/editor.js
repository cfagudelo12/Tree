angular.module('treeApp')
  .controller('EditorCtrl', function ($scope, featureModels) {
    
    $scope.currentFeatureModel=featureModels.currentFeatureModel;
    
    $scope.currentFeatureModelIndex=featureModels.currentFeatureModelIndex;
    
    $scope.featureModels = featureModels.list;
    
    $scope.version = {};
    
    $scope.version.summary = "";
    
    $scope.version.description = "";
   
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    } 
    today = dd+'/'+mm+'/'+yyyy;

    $scope.version.date = today;
    
    $scope.saveFeatureModel = function() {
        var v = {summary:$scope.version.summary,description:$scope.version.description,date:$scope.version.date};
        $scope.currentFeatureModel.versions.push(v);
        featureModels.save($scope.currentFeatureModel, $scope.currentFeatureModelIndex);
    };
  });

