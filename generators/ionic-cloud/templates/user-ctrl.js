'use strict';
angular.module('main')
.controller('UserCtrl', function (
  $log,
  $ionicAuth
) {

  this.user = {
    email: '',
    password: ''
  };
  this.updateResult = function (type, result) {
    $log.log(type, result);
    this.user.resultType = type;
    this.user.result = result;
  };

  var responseCB = function (response) {
    this.updateResult('Response', response);
  }.bind(this);

  var rejectionCB = function (rejection) {
    this.updateResult('Rejection', rejection);
  }.bind(this);

  // tries to sign the user up and displays the result in the UI
  this.signup = function () {
    $ionicAuth.signup(this.user)
    .then(responseCB)
    .catch(rejectionCB);
  };
  // tries to sign in the user and displays the result in the UI
  this.signin = function () {
    $ionicAuth.login('basic', this.user)
    .then(responseCB)
    .catch(rejectionCB);
  };
});
