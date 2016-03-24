angular.module('treeApp')
  .factory('factory', function () {
  
      var factory={};
      
      factory.users=[];
      
      factory.currentUser={};

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
      
      factory.addNewUser = function(user) {
          factory.users.push(user);
      };
      
      factory.myLogin = function(index) {
          factory.currentUser=factory.users[index];
      };
      
      factory.myLogout = function() {
          factory.currentUser={};
      };
      
      return factory;
  });

