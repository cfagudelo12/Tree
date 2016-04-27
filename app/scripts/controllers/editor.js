angular.module('treeApp')
  .controller('EditorCtrl', function ($scope, $compile, factory) {
    
    $scope.addingNode = false;
    
    $scope.editingNode = false;
    
    $scope.summary=null;
    
    $scope.description=null;
    
    $scope.date=null;
    
    $scope.type="";
    
    $scope.addingConstraints = false;
    
    $scope.addingAttribute = false;
    
    $scope.editingAttribute = false;
    
    $scope.goToAddingConstraints = function() {
        $scope.error=false;
        $scope.addingConstraints = true;
        $scope.middle="";
        $scope.featuresLeft=[];
        $scope.booleansLeft=[];
        $scope.featuresRight=[];
        $scope.booleansRight=[];
        $scope.featuresLeft.push({error:true});
        $scope.featuresRight.push({error:true});
    };
    
    $scope.addToLeft = function() {
        $scope.leftIsNotOk=true;
        var id=$scope.featuresLeft.length;
        $scope.featuresLeft.push({error:true});
        var idBoolean=$scope.booleansLeft.length;
        $scope.booleansLeft.push({error:true});
        angular.element(document.getElementById('left-space')).append($compile("<select class='form-control' ng-model='booleansLeft["+idBoolean+"]' style='width:80px'><option value='and'>and</option><option value='or'>or</option></select><select class='form-control' ng-model='featuresLeft["+id+"]' style='width:200px'><option ng-repeat='feature in features' value='{{feature.title}}'>{{feature.title}}</option><option ng-repeat='feature in features' value='not {{feature.title}}'>Not {{feature.title}}</option></select>")($scope));
    };

    $scope.addToRight = function() {
        $scope.rightIsNotOk=true;
        var id=$scope.featuresRight.length;
        $scope.featuresRight.push({error:true});
        var idBoolean=$scope.booleansRight.length;
        $scope.booleansRight.push({error:true});
        angular.element(document.getElementById('right-space')).append($compile("<select class='form-control' ng-model='booleansRight["+idBoolean+"]' style='width:80px'><option value='and'>and</option><option value='or'>or</option></select><select class='form-control' ng-model='featuresRight["+id+"]' style='width:200px'><option ng-repeat='feature in features' value='{{feature.title}}'>{{feature.title}}</option><option ng-repeat='feature in features' value='not {{feature.title}}'>Not {{feature.title}}</option></select>")($scope));
    };
    
    $scope.addConstraint = function() {
        var hayError=false;
        for(var i=0; i<$scope.featuresLeft.length&&!hayError; i++) {
            if($scope.featuresLeft[i].error) {
                hayError=true;
            }
        }
        for(var i=0; i<$scope.featuresRight.length&&!hayError; i++) {
            if($scope.featuresRight[i].error) {
                hayError=true;
            }
        }        
        for(var i=0; $scope.booleansLeft&&i<$scope.booleansLeft.length&&!hayError; i++) {
            if($scope.booleansLeft[i].error) {
                hayError=true;
            }
        }
        for(var i=0; $scope.booleansRight&&i<$scope.booleansRight.length&&!hayError; i++) {
            if($scope.booleansRight[i].error) {
                hayError=true;
            }
        }
        if(!hayError) {
            var result = "";
            var indexLeftBool=0;
            var indexRightBool=0;
            for(var i=0; i<$scope.featuresLeft.length; i++) {
                if(i===0) {
                    result+=$scope.featuresLeft[i]+" ";
                }
                else {
                    result+=$scope.booleansLeft[indexLeftBool]+" ";
                    result+=$scope.featuresLeft[i]+" ";
                    indexLeftBool++;
                }
            }
            result+=$scope.middle+" ";
            for(var i=0; i<$scope.featuresRight.length; i++) {
                if(i===0) {
                    result+=$scope.featuresRight[i]+" ";
                }
                else {
                    result+=$scope.booleansRight[indexRightBool]+" ";
                    result+=$scope.featuresRight[i]+" ";
                    indexRightBool++;
                }
            }
            var constraint={
                leftFeatures:$scope.featuresLeft,
                leftBooleans:$scope.booleansLeft,
                middle:$scope.middle,
                rightFeatures:$scope.featuresRight,
                rightBooleans:$scope.booleansRight,
                string:result
            };
            if($scope.featureModel.constraints) {
                $scope.featureModel.constraints.push(constraint);
            }
            else {
                 $scope.featureModel.constraints=[];
                 $scope.featureModel.constraints.push(constraint);
            }
            $scope.addingConstraints=false;
        }
        else {
            $scope.error=true;
        }
    };
    
    $scope.removeConstraint = function(index) {
        $scope.featureModel.constraints.splice(index, 1);
    };
    
    $scope.goToAddingNode = function(scope) {
        $scope.nodeData=scope.$modelValue;
        $scope.addingNode = true;
    };
    
    $scope.addNode = function() {
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
        $scope.type=null;
        $scope.addingNode=false;
    };
    
    $scope.goToEditingNode = function(scope) {
        $scope.nodeData=scope.$modelValue;
        $scope.editingNode = true;
    };
    
    $scope.editNode = function() {
        $scope.nodeData.title=$scope.title;
        $scope.nodeData.type=$scope.type;
        $scope.nodeData=null;
        $scope.title=null;
        $scope.type="";
        $scope.index=-1;
        $scope.editingNode=false;
    };
    
    $scope.goToAddingAttribute = function(scope) {
        $scope.nodeData=scope.$modelValue;
        $scope.attribute={};
        $scope.addingAttribute = true;
    };
    
    $scope.goToEditingAttribute = function(scope,index) {
        $scope.nodeData=scope.$modelValue;
        $scope.index=index;
        $scope.editingAttribute=true;
    };
    
    $scope.addAttribute = function() {
        if($scope.nodeData.attributes) {
            $scope.nodeData.attributes.push($scope.attribute);
        }
        else {
            $scope.nodeData.attributes=[];
            $scope.nodeData.attributes.push($scope.attribute);
        }
        $scope.addingAttribute = false;
        $scope.attribute=null;
    };
    
    $scope.editAttribute = function() {
        $scope.nodeData.attributes[$scope.index]=$scope.attribute;
        $scope.attribute=null;
        $scope.editingAttribute=false;
    };
    
    $scope.removeAttribute = function(scope, index) {
        $scope.nodeData=scope.$modelValue;
        $scope.nodeData.attributes.splice(index, 1);
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
        factory.saveFeatureModelVersion($scope.summary,$scope.description,$scope.date,$scope.featureModel.tree);
    };
  });

