angular.module('treeApp').factory('authentication', ['$firebaseAuth',
  function($firebaseAuth) {
    var ref=new Firebase("https://tree-mockup.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);