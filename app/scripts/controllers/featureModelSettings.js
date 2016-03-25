angular.module('treeApp')
  .controller('featureModelSettingsCtrl', function ($scope, factory) {
      $scope.addingContributor=false;
      
      $scope.currentFeatureModel=factory.currentUser.currentFeatureModel;
    
      $scope.currentFeatureModelIndex=factory.currentUser.currentFeatureModelIndex;
      
      $scope.username="";
      
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
      
      $scope.goToAddingContributor = function() {
          $scope.addingContributor=true;
      };
      
      $scope.goBack = function() {
          $scope.username="";
          $scope.addingContributor=false;
      };
  });
