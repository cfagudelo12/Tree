angular.module('treeApp', ['ui.tree','ui.router','firebase','ui.bootstrap']).config(function($stateProvider, $urlRouterProvider) { 
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html",
      controller: 'MainCtrl'
    })
    .state('creating', {
      url: "/create",
      templateUrl: "views/creating.html",
      controller: 'FormCtrl'
    })
    .state('editing', {
      url: "/editor",
      templateUrl: "views/editing.html",
      controller: 'EditorCtrl'
    })
    .state('setting', {
      url: "/settigs",
      templateUrl: "views/settings.html",
      controller: 'featureModelSettingsCtrl'
    })
    .state('versioning', {
      url: "/versions",
      templateUrl: "views/versions.html",
      controller: 'VersionsCtrl'
    })
    .state('signup-login', {
      url: "/",
      templateUrl: "views/signup-login.html",
      controller: 'Signup-LoginCtrl'
    });
  });


