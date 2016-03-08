'use strict';

/**
 * @ngdoc function
 * @name treeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the treeApp
 */
angular.module('treeApp')
  .controller('MainCtrl', function ($scope, $location) {
    
    $scope.homeView=true;
    $scope.configure=false;
    $scope.editing=false;
    $scope.creating=false;
    $scope.historial=false;
    
    $scope.newFeatureModel={title:"",description:"",tree:[]};
    
    $scope.currentFeatureModel={title:"",description:"",tree:[]};
    
    $scope.featureModels = [];
    
    $scope.eFeatureModels = [];
    
    $scope.startForm = function(){
        $scope.homeView=false;
        $scope.configure=false;
        $scope.editing=false;
        $scope.creating=true;
        $scope.historial=false;
    };
    
    $scope.goToDefault = function(){
        $scope.homeView=true;
        $scope.configure=false;
        $scope.editing=false;
        $scope.creating=false;
        $scope.historial=false;
    };
    
    $scope.goToEditing = function(){
        $scope.homeView=false;
        $scope.configure=false;
        $scope.editing=true;
        $scope.creating=false;
        $scope.historial=false;
    };
    
    $scope.goToHistorial = function(){
        $scope.homeView=false;
        $scope.configure=false;
        $scope.editing=false;
        $scope.creating=false;
        $scope.historial=true;
    };
    
    $scope.seeVersionHistory = function(index) {

    };
    
    $scope.resetForm = function() {
        $scope.newFeatureModel.title = "";
        $scope.newFeatureModel.description = "";
    };
    
    $scope.addFeatureForm = function() {
        var v = {title:$scope.newFeatureModel.title,description:$scope.newFeatureModel.description,tree:[]};
        var sameTitle = false;
        for (var i = 0; i < $scope.featureModels.length && !sameTitle; i++) {
            if($scope.newFeatureModel.title===$scope.featureModels[i].title){
                sameTitle=true;
            }
        }
        if(sameTitle){
            alert("You cannot use the same title in different feature models");
        }
        else{
            $scope.featureModels.push(v);
            $scope.goToDefault();
        }
        $scope.resetForm();
    };
    
    $scope.removeFeatureModel = function (index) {
        $scope.featureModels.splice(index, 1);
    };
    
    $scope.editFeatureModel = function (index) {
        $scope.currentFeatureModel=$scope.featureModels[index];
        $scope.goToEditing();
    };
  });
