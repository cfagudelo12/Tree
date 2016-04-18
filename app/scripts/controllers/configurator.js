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
      
      $scope.saveConfiguration = function() {
          factory.saveConfiguration();
          $scope.configuration=factory.configuration;
          $scope.tree=factory.configuration.tree;
      };
});
