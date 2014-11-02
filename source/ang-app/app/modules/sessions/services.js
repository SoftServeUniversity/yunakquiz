(function(){
  angular.module('yunakQuiz.sessions')
    .factory('accessService', ['$resource', function($resource) {
      return $resource('http://localhost:9292/access');
    }]);
})();
