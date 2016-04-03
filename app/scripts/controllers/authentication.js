angular.module('treeApp').factory('authentication', ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://sweltering-heat-2690.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);