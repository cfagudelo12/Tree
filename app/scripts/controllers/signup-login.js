angular.module('treeApp')
  .controller('Signup-LoginCtrl', function ($scope, $location, factory) {
      $scope.login = true;
      
      $scope.signup = false;
      
      $scope.signupError = false;
      
      $scope.signupErrorMessage = "";
      
      $scope.loginError = false;
      
      $scope.loginErrorMessage = "";
      
      $scope.newUser = {};
      
      $scope.loginAttemp = {};
      
      $scope.goToSignup = function() {
          $scope.login = false;
          $scope.signup = true;
          $scope.signupError = false;
          $scope.signupErrorMessage = "";
          $scope.loginError = false;
          $scope.loginErrorMessage = "";
      };
      
      $scope.goToLogin = function() {
          $scope.login = true;
          $scope.signup = false;
          $scope.signupError = false;
          $scope.signupErrorMessage = "";
          $scope.loginError = false;
          $scope.loginErrorMessage = "";
      };
      
      $scope.addUser = function() {
          var sameUsername = false;
          var sameEmail = false;
          for (var i = 0; i < factory.users.length && !sameUsername && !sameEmail; i++) {
            if($scope.newUser.username===factory.users[i].username){
              sameUsername=true;
            }
            else if($scope.newUser.email===factory.users[i].email) {
              sameEmail=true;
            }
          }
          if(sameUsername) {
            $scope.signupError = true;
            $scope.signupErrorMessage = "That username is already taken";
          }
          else if(sameEmail) {
            $scope.signupError = true;
            $scope.signupErrorMessage = "You have already an account";  
          }
          else {
            $scope.newUser.featureModelsList = [];
            $scope.newUser.teamFeatureModelsList = [];
            $scope.newUser.currentFeatureModel={};
            $scope.newUser.currentFeatureModelIndex=-1;
            factory.addNewUser($scope.newUser);
            $scope.newUser={};
            $scope.goToLogin();
          }
      };
      
      $scope.myLogin = function() {
          for (var i = 0; i < factory.users.length; i++) {
              if($scope.loginAttemp.username===factory.users[i].username) {
                  if($scope.loginAttemp.password===factory.users[i].password) {
                      $scope.loginError=false;
                      $scope.loginErrorMessage="";
                      factory.currentUser=factory.users[i];
                      var earl = '/main';
                      $location.path(earl);
                      return;
                  }
                  else {
                      $scope.loginError=true;
                      $scope.loginErrorMessage="Wrong password";
                      return;
                  }
              }   
          }
          $scope.loginError=true;
          $scope.loginErrorMessage="Wrong username";
      };
       
      $scope.myLogout = function() {
          factory.myLogout();
      };
  });


