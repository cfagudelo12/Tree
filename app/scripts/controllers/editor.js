angular.module('treeApp')
  .controller('EditorCtrl', function ($scope, factory) {
    
    $scope.addingNode = false;
    
    $scope.summary=null;
    
    $scope.description=null;
    
    $scope.date=null;
    
    $scope.type="";

    $scope.addNode = function () {
        if($scope.nodeData.nodes) {
            $scope.nodeData.nodes.push({
                title: $scope.title,
                type: $scope.type,
                nodes: []
            });
        }
        else {
            $scope.nodeData.nodes=[];
            $scope.nodeData.nodes.push({
              title: $scope.title,
              type: $scope.type,
              nodes: []
            });
        }
        $scope.nodeData=null;
        $scope.title=null;
        $scope.addingNode=false;
    };
    
    $scope.goToAddingNode = function(scope) {
        $scope.nodeData=scope.$modelValue;
        $scope.addingNode = true;
    };

    $scope.featureModel=factory.featureModel;
    
    $scope.tree=factory.featureModel.tree;
        
    $scope.features=factory.getFeatures();
              
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

