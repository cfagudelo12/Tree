angular.module('treeApp')
  .controller('featureModelSettingsCtrl', function ($scope, factory) {
      $scope.addingContributor=false;
      
      $scope.currentFeatureModel=factory.currentUser.currentFeatureModel;
    
      $scope.currentFeatureModelIndex=factory.currentUser.currentFeatureModelIndex;
      
      $scope.username="";
      
      $scope.permissionSelect="";
      
      $scope.title="";
      
      $scope.description="";
      
      $scope.addingContributorError=false;
      
      $scope.addingContributorErrorMessage="";
      
      $scope.changed=false;

      $scope.removeFeatureModel = function() {
          factory.removeFeatureModel(factory.currentUser.currentFeatureModelIndex);
      };
        
      $scope.saveFeatureModel = function() {
          $scope.currentFeatureModel.title=$scope.title;
          $scope.currentFeatureModel.description=$scope.description;
          factory.saveFeatureModel($scope.currentFeatureModel, $scope.currentFeatureModelIndex);
      };
      
      $scope.removeContributor = function(index) {
          factory.currentUser.currentFeatureModel.contributors.splice(index, 1);
          $scope.changed=true;
      };
      
      $scope.addContributor = function() {
          var userTemp = $scope.username;
          var encontrado = false;
          $scope.username = "";
          for (var i = 0; i < factory.currentUser.currentFeatureModel.contributors.length && !encontrado; i++) {
              if(userTemp===factory.currentUser.currentFeatureModel.contributors.user.username) {
                  encontrado=true;
                  $scope.addingContributorErrorMessage="Contributor already added";
              }   
          }
          for (var i = 0; i < factory.users.length && !encontrado; i++) {
              if(userTemp===factory.users[i].username) {
                  encontrado=true;
                  $scope.addingContributor=false;
                  $scope.addingContributorError=false;
                  $scope.addingContributorErrorMessage="";
                  var permission={featureModel:factory.currentUser.currentFeatureModel,permission:$scope.permission};
                  var permission2={user:factory.users[i],permission:$scope.permission};
                  factory.users[i].teamFeatureModelsList.push(permission);
                  factory.currentUser.currentFeatureModel.contributors.push(permission2);
                  $scope.changed=true;
              }   
          }
          if(!encontrado) {
              $scope.addingContributorError=true;
              $scope.addingContributorErrorMessage="Username not found";
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
