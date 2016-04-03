angular.module('treeApp')
  .controller('Signup-LoginCtrl', function ($scope, $location, authentication) {
      $scope.signup = false;
      
      $scope.login = true;
      
      $scope.goToSignup = function() {
          $scope.error = false;
          $scope.errorMessage = null;
          $scope.login = false;
          $scope.signup = true;
      };
      
      $scope.goToLogin = function() {
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
                $scope.email=null;
                $scope.password=null;
                $scope.passwordConfirmation=null;
                $scope.goToLogin();
            }).catch(function(error) {
                $scope.error = true;
                $scope.errorMessage = $scope.handleError(error);
            });
        };
      
    // $scope.createUser = function() {
    //      var ref = new Firebase("https://sweltering-heat-2690.firebaseio.com");
        // ref.createUser({
      // /       email: $scope.newUser.email,
       //       password: $scope.newUser.password,
        //      featureModels: [],
         //     teamFeatureModels: [],
          //    currentFeatureModel: {},
           //   currentFeatureModelIndex: -1
      //    }).then(function () {
      //        alert("Prim");
      //    }).then(function(authData){
      //       alert("AuthData");
       //   }).catch(function(error) {
      //        alert("Error");
      //        $scope.signupError = true;
      //        $scope.signupErrorMessage = error;
      //    });
     // };
              
      $scope.loginUser = function() {
        $scope.authData = null;
        authentication.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function(authData) {
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


