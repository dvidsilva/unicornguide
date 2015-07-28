angular.module('unicornguide', ['firebase'])
.factory('FB', function(){
  return new Firebase("https://unicornguide.firebaseio.com");
})
.factory("Auth", function ($firebaseAuth, FB) {
    var ref = FB;
    return $firebaseAuth(ref);
  }
)
.controller('userController', function (Auth) {
  var _self = this;
  _self.loggedIn = false;
  _self.email = "";
  _self.password = "";

  _self.login = function () {
    Auth.$authWithPassword({
      email    : _self.email,
      password : _self.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
       _self.loggedIn = true;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
      _self.loggedIn = false;
    });
  };

  Auth.$onAuth(function (authData) {
    if (authData===null) {
      _self.loggedIn = false;
      return;
    }
    console.log("Logged in as:", authData.uid);
    _self.loggedIn = true;
  });
})
.controller('AccelController' , function (Auth, FB, $firebaseArray, $log) {
  var _self = this;
  _self.new = {};
  Auth.$onAuth(function (authData) {
    if (authData===null) {
      _self.loggedIn = false;
      return;
    }
    console.log("Logged in as:", authData.uid);
    _self.loggedIn = true;
  });

  _self.data = $firebaseArray(FB.child("accelerators"));
  _self.addNew = function () {
    $log.info(_self.new);
    _self.data.$add(_self.new);
    _self.new = {};
  }


});