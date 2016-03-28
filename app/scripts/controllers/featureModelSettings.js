angular.module('treeApp')
  .controller('featureModelSettingsCtrl', function ($scope, factory) {
      $scope.addingContributor=false;
      
      $scope.currentFeatureModel=factory.currentUser.currentFeatureModel;
    
      $scope.currentFeatureModelIndex=factory.currentUser.currentFeatureModelIndex;
      
      $scope.username="";
      
      $scope.permissionSelect={};
      
      $scope.title="";
      
      $scope.description="";

      $scope.removeFeatureModel = function (index) {
          factory.removeFeatureModel(index);
      };
        
      $scope.saveFeatureModel = function() {
          factory.saveFeatureModel($scope.currentFeatureModel, $scope.currentFeatureModelIndex);
      };
      
      $scope.shareFeatureModel = function() {
          
      };
      
      $scope.removeContributor = function(index) {
          
      };
      
      $scope.addContributor = function() {
          alert($scope.permission);
          var userTemp = $scope.username;
          $scope.username = "";
          for (var i = 0; i < factory.users.length; i++) {
              if(userTemp===factory.users[i].username) {
                  var permission={featureModel:factory.currentUser.currentFeatureModel,permission:$scope.permission};
              }   
          }
      };
      
      $scope.goToAddingContributor = function() {
          $scope.addingContributor=true;
      };
      
      $scope.goBack = function() {
          $scope.username="";
          $scope.addingContributor=false;
      };
  });
