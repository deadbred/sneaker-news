
var myApp = angular.module('sneakerNews', [
  'ui.router', 
  'templates',
  'Devise'
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
    })

      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function() {
            $state.go('home');
          });
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function() {
            $state.go('home');
          });
        }]
      });
      
      $urlRouterProvider.otherwise('home');
    }]);
