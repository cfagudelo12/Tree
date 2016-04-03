angular.module('treeApp')
  .factory('factory', function ($firebaseObject) {
  
      var factory={};
      
      factory.users={};
      
      var ref=new Firebase("https://tree-mockup.firebaseio.com");
      
      factory.loginUser = function(uid) {
          factory.currentUser = uid;
      };
      
      factory.createUser = function(uid) {
          var profileRef = ref.child(uid);
          var newUser=$firebaseObject(profileRef);
          newUser.uid=uid;
          newUser.$save();
      };

      factory.addFeatureModel = function(featureModel) {
        factory.currentUser.featureModelsList.push(featureModel);
      };
      
      factory.selectFeatureModel = function(index) {
        factory.currentUser.currentFeatureModelIndex=index;
        factory.currentUser.currentFeatureModel=factory.currentUser.featureModelsList[index];
      };
      
      factory.removeFeatureModel = function(index) {
        factory.currentUser.featureModelsList.splice(index, 1);
      };
      
      factory.saveFeatureModel = function(featureModel, index) {
          factory.currentUser.featureModelsList[index] = featureModel;
      };
      
      factory.myLogin = function(index) {
          factory.currentUser=factory.users[index];
      };
      
      factory.myLogout = function() {
          factory.currentUser={};
      };
      
      return factory;
  });

