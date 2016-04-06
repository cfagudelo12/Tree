angular.module('treeApp')
  .controller('featureModelSettingsCtrl', function ($scope, factory) {
      $scope.addingContributor=false;
      
      $scope.featureModel=factory.featureModel;
      
      $scope.user="";
      
      $scope.permissionSelect="";
      
      $scope.title="";
      
      $scope.description="";
      
      $scope.addingContributorError=false;
      
      $scope.addingContributorErrorMessage="";

      $scope.removeFeatureModel = function() {
          factory.removeFeatureModel();
      };
        
      $scope.saveFeatureModel = function() {
          $scope.featureModel.title=$scope.title;
          $scope.featureModel.description=$scope.description;
          factory.saveFeatureModel();
      };
      
      $scope.removeContributor = function(index) {
          factory.removeContributor(index);
      };
      
      $scope.addContributor = function() {
          var encontrado = false;
          var contributors = factory.getContributors();
          contributors.$loaded().then(function(){
              for (var i = 0; i < contributors.length && !encontrado; i++) {
                  if($scope.user===contributors[i].user) {
                      encontrado=true;
                      $scope.addingContributorError=true;
                      $scope.addingContributorErrorMessage="Contributor already added";
                  }
              }
              if(!encontrado) {
                  var temp = factory.addContributor($scope.user, $scope.permissionSelect);
                  temp.then(function(result){
                      if(result!==null) {
                          $scope.addingContributorError=true;
                          $scope.addingContributorErrorMessage=result;
                      }
                      else {
                          $scope.goBack();
                      }
                  });       
              }
              $scope.user = "";
          });
      };
      
      $scope.goToAddingContributor = function() {
          $scope.addingContributor=true;
          $scope.addingContributorError=false;
      };
      
      $scope.goBack = function() {
          $scope.addingContributorError=false;
          $scope.username="";
          $scope.addingContributor=false;
      };
  });
