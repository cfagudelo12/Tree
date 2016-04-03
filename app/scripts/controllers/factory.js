angular.module('treeApp')
  .factory('factory', function ($firebaseObject, $firebaseArray) {
  
      var factory={};
      
      var baseRef="https://tree-mockup.firebaseio.com";
      
      factory.loginUser = function(uid) {
          factory.currentUser = uid;
          var featureModelsRef = new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels");
          factory.featureModels = $firebaseArray(featureModelsRef);
      };
      
      factory.createUser = function(uid) {
          var ref = new Firebase(baseRef+"/users");
          var userRef = ref.child(uid);
          var newUser=$firebaseObject(userRef);
          newUser.uid=uid;
          newUser.$save();
      };

      factory.addFeatureModel = function(title, description) {
          var sameTitle = false;
          factory.featureModels.$loaded()
            .then(function(){
                for(var i=0; i<factory.featureModels.length&&!sameTitle; i++) {
                    if(title===factory.featureModels[i].title) {
                        sameTitle=true;
                        alert("You cannot have 2 feature models with the same title.");
                    }
                }
                if(!sameTitle) {
                  factory.featureModels.$add({
                    title:title,
                    description:description,
                    author:factory.currentUser
                  });
                }
            });
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
      
      factory.myLogout = function() {
          factory.currentUser={};
      };
      
      return factory;
  });

