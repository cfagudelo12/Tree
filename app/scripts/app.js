
/**
 * @ngdoc overview
 * @name treeApp
 * @description
 * # treeApp
 *
 * Main module of the application.
 */
angular.module('treeApp', ['ui.tree','ngRoute']).config(['$routeProvider', function($routeProvider) { 
    $routeProvider
        .when('/', {
            templateUrl : 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/versions', {
            templateUrl : 'views/versions.html',
            controller: 'VersionsCtrl'
        })
        .when('/editing', {
            templateUrl : 'views/editing.html',
            controller: 'EditorCtrl'
        })
        .when('/form', {
            templateUrl : 'views/form.html',
            controller: 'FormCtrl'
        });
  }])


