angular.module('treeApp')
  .factory('factory', function ($firebaseObject, $firebaseArray) {
  
      var factory={};
      
      var baseRef="https://tree-mockup.firebaseio.com";
      
      factory.loginUser = function(uid) {
          factory.currentUser = uid;
          var featureModelsRef = new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels");
          factory.featureModels = $firebaseArray(featureModelsRef);
      };
      
      factory.createUser = function(uid, user) {
          var ref = new Firebase(baseRef+"/users");
          var userRef = ref.child(uid);
          var newUser=$firebaseObject(userRef);
          newUser.uid=uid;
          newUser.user=user;
          newUser.$save();
      };

      factory.addFeatureModel = function(title, description, rootTitle) {
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
                    author:factory.currentUser,
                    tree:[{
                        'title':rootTitle,
                        'type':"Root Node",
                        'nodes':[]
                    }]
                  });
                }
            });
      };
      
      factory.selectFeatureModel = function(index) {
        factory.featureModelIndex=index;
        factory.featureModel=factory.featureModels[index];
      };
      
      factory.removeFeatureModel = function() {
        factory.featureModels.$remove(factory.featureModelIndex);
      };
      
      factory.saveFeatureModel = function() {
          factory.featureModels[factory.featureModelIndex]=factory.featureModel;
          factory.featureModels.$save(factory.featureModelIndex);
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
      
      factory.getContributors = function() {
          var contributorsRef=new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels/"+factory.featureModel.$id+"/contributors");
          var contributors=$firebaseArray(contributorsRef);
          return contributors;
      };
      
      factory.addContributor = function(user, permission) {
          var usersRef = new Firebase(baseRef+"/users");
          var users = $firebaseArray(usersRef);
          var contributorsRef=new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels/"+factory.featureModel.$id+"/contributors");
          var contributors=$firebaseArray(contributorsRef);
          var promise = users.$loaded().then(function() {
              var result=null;
              var encontrado=false;
              for (var i = 0; i < users.length && !encontrado; i++) {
                  if(user===users[i].user&&users[i].uid!==factory.currentUser) {
                      encontrado=true;
                      contributors.$add({
                          uid:users[i].uid,
                          user:user,
                          permission:permission
                      });
                  }   
              }
              if(!encontrado) {
                  result="User not found";
              }
              else {
                  result=null;
              }
              return result;
          });
          return promise;
      };
      
      factory.removeContributor = function(index) {
          var contributorsRef=new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels/"+factory.featureModel.$id+"/contributors");
          var contributors=$firebaseArray(contributorsRef);
          contributors.$loaded().then(function(){
              contributors.$remove(index);
          });        
      };
      
      return factory;
  });

