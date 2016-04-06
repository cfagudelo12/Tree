angular.module('treeApp')
  .controller('Signup-LoginCtrl', function ($scope, $location, authentication, factory) {
      $scope.signup = false;
      
      $scope.login = true;
      
      $scope.goToSignup = function() {
          $scope.email=null;
          $scope.password=null;
          $scope.error = false;
          $scope.errorMessage = null;
          $scope.login = false;
          $scope.signup = true;
      };
      
      $scope.goToLogin = function() {
          $scope.email=null;
          $scope.password=null;
          $scope.error = false;
          $scope.errorMessage = null;
          $scope.login = true;
          $scope.signup = false;
      };
      
      $scope.createUser = function() {
          authentication.$createUser({
              email: $scope.email,
              password: $scope.password
          }).then(function(userData) {
              factory.createUser(userData.uid, $scope.email);
              $scope.email=null;
              $scope.password=null;
              $scope.passwordConfirmation=null;
              $scope.goToLogin();
          }).catch(function(error) {
              $scope.error = true;
              $scope.errorMessage = $scope.handleError(error);
          });
      };
              
      $scope.loginUser = function() {
        $scope.authData = null;
        authentication.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function(authData) {
            factory.loginUser(authData.uid);
            $scope.email=null;
            $scope.password=null;
            $location.path('/home');
        }).catch(function(error) {
            $scope.error = true;
            $scope.errorMessage = $scope.handleError(error);
        });
      };
      
      $scope.handleError = function(error) {
          switch (error.code) {
              case "INVALID_EMAIL":
                  return "The specified user account email is invalid.";
              break;
              case "INVALID_PASSWORD":
                  return "The specified user account password is incorrect.";
              break;
              case "EMAIL_TAKEN":
                  return "The specified email address is already in use.";
              break;
              case "INVALID_EMAIL":
                  return "The specified email address is invalid.";
              break;
              default:
                  return error;
          }
      };
  });


