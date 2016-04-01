angular.module('treeApp')
  .controller('Signup-LoginCtrl', function ($scope, $location, factory) {
      $scope.signup = false;
      
      $scope.signupError = false;
      
      $scope.signupErrorMessage = "";
      
      $scope.signupRegister = true;
      
      $scope.signupCancel = true;
      
      $scope.login = true;
      
      $scope.loginError = false;
      
      $scope.loginErrorMessage = "";
      
      $scope.loginSubmit = true;
      
      $scope.loginCreateAccount = true;
      
      $scope.newUser = {};
      
      $scope.loginAttemp = {};
      
      $scope.goToSignup = function() {
          $scope.loginAttemp = {};
          $scope.login = false;
          $scope.signup = true;
          $scope.signupError = false;
          $scope.signupErrorMessage = "";
          $scope.loginError = false;
          $scope.loginErrorMessage = "";
      };
      
      $scope.goToLogin = function() {
          $scope.newUser = {};
          $scope.login = true;
          $scope.signup = false;
          $scope.signupError = false;
          $scope.signupErrorMessage = "";
          $scope.loginError = false;
          $scope.loginErrorMessage = "";
      };
      
      $scope.createUser = function() {
            var ref = new Firebase("https://sweltering-heat-2690.firebaseio.com");
            $scope.signupRegister = false;
            $scope.signupCancel = false;
            ref.createUser({
                email: $scope.newUser.email,
                password: $scope.newUser.password,
                featureModels: [],
                teamFeatureModels: [],
                currentFeatureModel: {},
                currentFeatureModelIndex: -1
            }, function (error, userData) {
                if (error) {
                    $scope.signupRegister = true;
                    $scope.signupCancel = true;
                    $scope.signupError = true;
                    $scope.signupErrorMessage = error;
                } else {
                    $scope.signupRegister = true;
                    $scope.signupCancel = true;
                    $scope.goToLogin();
                }
            });
      };
      
      $scope.myLogin = function() {
          $scope.loginSubmit = true;
          $scope.loginCreateAccount = true;
          var ref = new Firebase("https://sweltering-heat-2690.firebaseio.com");
          ref.authWithPassword({
              email: $scope.loginAttemp.email,
              password: $scope.loginAttemp.password
          }, function(error, authData) {
          if (error) {
              $scope.loginSubmit = true;
              $scope.loginCreateAccount = true;
              $scope.loginError=true;
              $scope.loginErrorMessage=error;
          } else {
              alert("Entra");
              $scope.loginSubmit = true;
              $scope.loginCreateAccount = true;
              $location.path('/home');
          }
        });     
      };
  });


