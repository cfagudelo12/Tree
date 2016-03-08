'use strict';

/**
 * @ngdoc overview
 * @name treeApp
 * @description
 * # treeApp
 *
 * Main module of the application.
 */
var app = angular.module('treeApp', ['ui.tree','ngRoute']).config(function($routeProvider) { 
    $routeProvider
        .when('/', {
            templateUrl : 'views/main.html'
        })
        .when('/versions', {
            templateUrl : 'views/versions.html'
        });
});


