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
      
      factory.getFeatures = function() {
        var list=[];
        if(factory.featureModel.tree) {
            for(var i = 0; i < factory.featureModel.tree.length; i++) {
                factory.recursion(list, factory.featureModel.tree[i]);
            }
        }
        return list;
      };
      
      factory.recursion = function(list, node) {
        list.push({
            'title':node.title,
            'type':node.type
        });
        if(node.nodes) {
           for(var i = 0; i < node.nodes.length; i++) {
            factory.recursion(list, node.nodes[i]);
           } 
        }
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
      
      factory.addConfiguration = function(configuration) {
          var configurationsRef=new Firebase(baseRef+"/users/"+factory.currentUser+"/featureModels/"+factory.featureModel.$id+"/configurations");
          var configurations=$firebaseArray(configurationsRef);
          var promise = configurations.$loaded().then(function() {
              var result=null;
              var encontrado=false;
              for (var i = 0; i < configurations.length && !encontrado; i++) {
                  if(configuration.title===configurations[i].title) {
                      encontrado=true;
                      result="Error";
                  }   
              }
              if(!encontrado) {
                  var tree=factory.configurationCreator();
                  configuration.tree=tree;
                  configurations.$add(configuration);
              }
              return result;
          });
          return promise;
      };
      
      factory.configurationCreator = function() {
          var tree=factory.featureModel.tree;
          for(var i=0; i<tree.length; i++) {
              tree[i].state="Undecided";
              factory.configurationRecursion(tree[i]);
          }
          return tree;
      };
      
      factory.configurationRecursion = function(node) {
          node.state="Undecided";
          for(var i=0; node.nodes&&i<node.nodes.length; i++) {
              factory.configurationRecursion(node.nodes[i]);
          }
      };
      
      return factory;
  });

