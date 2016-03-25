angular.module('treeApp', ['ui.tree','ngRoute']).config(['$routeProvider', function($routeProvider) { 
    $routeProvider
        .when('/', {
            //templateUrl : 'views/signup-login.html',
            templateUrl : 'views/featureModelSettings.html',
            controller: 'featureModelSettingsCtrl'
            //controller: 'Signup-LoginCtrl'
        })
        .when('/main', {
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
        })
        .when('/featureModelSettings', {
            templateUrl : 'views/featureModelSettings.html',
            controller: 'featureModelSettingsCtrl'
        });
  }]);


