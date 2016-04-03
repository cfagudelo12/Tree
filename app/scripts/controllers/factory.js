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
      
      factory.selectFeatureModel = function(id) {
        var featureModelRef=new Firebase(baseRef);
        factory.featureModel=$firebaseObject(featureModelRef.child('users').child(factory.currentUser).child('featureModels').child(id));
      };
      
      factory.removeFeatureModel = function(id) {
        factory.featureModels.$remove(id);
      };
      
      factory.saveFeatureModel = function() {
          factory.featureModel.$save;
      };
      
      factory.saveFeatureModelVersion = function(summary, description, date) {
          var versionsRef=new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels/"+factory.featureModel.$id+"/versions");
          var versions=$firebaseArray(versionsRef);
          versions.$add({
              summary:summary,
              description:description,
              date:date
          });
      };
      
      return factory;
  });

