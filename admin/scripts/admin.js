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
.controller('AccelController' , function (Auth, FB, $firebaseArray, $log, $window) {
  var _self = this;

  _self.action = "create";

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

  _self.select = function (a) {
    _self.action = 'edit';
    _self.new = _self.data.$getRecord(a.$id);
  }

  _self.save = function () {
    $log.info(_self.action);
    if (_self.action === 'edit') {
      _self.data.$save(_self.new);
    } else if (_self.action === 'create'){
      addNew();
    }
  };

  _self.remove = function () {
    $log.warn('deleting record');
    $log.info(JSON.stringify(_self.new));
    if ( $window.confirm("Do you really wanna delete this record?!")) {
      _self.data.$remove(_self.new);
    }
  };

  _self.clearForm = function () {
    _self.new = {};
    _self.action = 'create';
  };

  var addNew = function () {
    $log.info(_self.new);
    _self.data.$add(_self.new);
    _self.new = {};
  };


});