
var myApp = angular.module('sneakerNews', [
  'ui.router', 
  'templates'
  ]);

  //home state
  myApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })

      .state('post', {
       url: '/posts/{id}',
       templateUrl: 'posts/_posts.html',
       controller: 'PostCtrl',
       resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    });
      
      $urlRouterProvider.otherwise('home');
    }]);
