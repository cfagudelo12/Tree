angular.module('treeApp')
  .controller('ConfigurationsCtrl', function ($scope, factory) {
      $scope.featureModel=factory.featureModel;
      
      $scope.goToCreate = function() {
          $scope.creating=true;
      };
      
      $scope.cancelCreation = function() {
          $scope.title=null;
          $scope.description=null;
          $scope.creating=false;
      };
      
      $scope.addConfiguration = function() {
          $scope.error=false;
          var configuration = {
              'title':$scope.title,
              'description':$scope.description
          };
          var temp = factory.addConfiguration(configuration);
          temp.then(function(result) {
              if(result!==null) {
                  $scope.error=true;
              }
          });
          $scope.title=null;
          $scope.description=null;
          $scope.creating=false;
      };
      
      $scope.selectConfiguration = function(index) {
          factory.selectConfiguration(index);
      };
});