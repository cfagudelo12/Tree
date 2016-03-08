'use strict';

/**
 * @ngdoc function
 * @name treeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the treeApp
 */
angular.module('treeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.creating=false;
    $scope.currentFeatureModel={title:"",description:""};
    $scope.featureModels = [];
    $scope.eFeatureModels = [];
    $scope.startForm = function(){
        $scope.creating=true;
    };
    $scope.resetForm = function() {
        $scope.currentFeatureModel.title = "";
        $scope.currentFeatureModel.description = "";
    };
    $scope.addFeatureForm = function() {
        var v = {title:$scope.currentFeatureModel.title,description:$scope.currentFeatureModel.description};
        $scope.featureModels.push(v);
        $scope.resetForm();
        $scope.creating=false;
    }   
  });
