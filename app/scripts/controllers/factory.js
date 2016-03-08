angular.module('treeApp')
  .factory('featureModels', function () {
  
      var featureModels={};
      
      featureModels.currentFeatureModel={};
      
      featureModels.currentFeatureModelIndex=-1;
      
      featureModels.list=[];
      
      featureModels.add = function(featureModel) {
        featureModels.list.push(featureModel);
      };
      
      featureModels.select = function(index) {
        featureModels.currentFeatureModelIndex=index;
        featureModels.currentFeatureModel=featureModels.list[index];
      };
      
      featureModels.remove = function(index) {
        featureModels.list.splice(index, 1);
      };
      
      featureModels.save = function(featureModel, index) {
          featureModels.list[index] = featureModel;
      };
    
      return featureModels;
  });

