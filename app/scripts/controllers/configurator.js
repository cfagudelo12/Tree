angular.module('treeApp')
  .controller('ConfiguratorCtrl', function ($scope, factory) {
      $scope.configuration=factory.configuration;
      
      $scope.tree=factory.configuration.tree;
      
      $scope.selectFeature = function(scope) {
          $scope.nodeData=scope.$modelValue;
          $scope.nodeData.state="Selected";
      };
      
      $scope.deselectFeature = function(scope) {
          $scope.nodeData=scope.$modelValue;
          $scope.nodeData.state="Deselected";
      };
      
      $scope.preferFeature = function(scope) {
          $scope.nodeData=scope.$modelValue;
          if($scope.nodeData.preferedBy) {
              $scope.nodeData.preferedBy.push(factory.currentUser);
              $scope.nodeData.prefered=true;
          }
          else {
              $scope.nodeData.preferedBy=[];
              $scope.nodeData.preferedBy.push(factory.currentUser);
              $scope.nodeData.prefered=true;
          }
      };
      
      $scope.noPreferFeature = function(scope) {
          $scope.nodeData=scope.$modelValue;
          $scope.nodeData.prefered=false;
          var found=false;
          for(var i = 0; i < $scope.nodeData.preferedBy.length && !found; i++) {
              if($scope.nodeData.preferedBy[i]===factory.currentUser) {
                  $scope.nodeData.preferedBy.splice(i,1);
                  found=true;
              }
          }
      };
      
      $scope.depreferFeature = function(scope) {
          $scope.nodeData=scope.$modelValue;
          if($scope.nodeData.depreferedBy) {
              $scope.nodeData.depreferedBy.push(factory.currentUser);
              $scope.nodeData.deprefered=true;
          }
          else {
              $scope.nodeData.depreferedBy=[];
              $scope.nodeData.depreferedBy.push(factory.currentUser);
              $scope.nodeData.deprefered=true;
          }
      };
      
      $scope.noDepreferFeature = function(scope) {
          $scope.nodeData=scope.$modelValue;
          $scope.nodeData.deprefered=false;
          var found=false;
          for(var i = 0; i < $scope.nodeData.depreferedBy.length && !found; i++) {
              if($scope.nodeData.depreferedBy[i]===factory.currentUser) {
                  $scope.nodeData.depreferedBy.splice(i,1);
                  found=true;
              }
          }
      };
      
      $scope.saveConfiguration = function() {
          factory.saveConfiguration();
          $scope.configuration=factory.configuration;
          $scope.tree=factory.configuration.tree;
      };
});
