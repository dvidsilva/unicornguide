angular.module('unicornguide', ['firebase', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: "homeController",
      controllerAs: ""
    })
})
.factory('FB', function(){
  return new Firebase("https://unicornguide.firebaseio.com");
})
.controller('homeController', function (FB) {
  var _self = this;
  _self.data = $firebaseArray(FB.child("accelerators"));

})
