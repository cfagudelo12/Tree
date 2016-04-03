angular.module('treeApp')
  .controller('EditorCtrl', function ($scope, factory) {
    
    $scope.summary=null;
    
    $scope.description=null;
    
    $scope.date=null;
    
    $scope.featureModel=factory.featureModel;
   
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

    $scope.date = today;
    
    $scope.saveFeatureModel = function() {
        factory.saveFeatureModel();
        factory.saveFeatureModelVersion($scope.summary,$scope.description,$scope.date);
    };
  });

