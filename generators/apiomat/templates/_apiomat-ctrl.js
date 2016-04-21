'use strict';
angular.module('<%= moduleName %>')
.controller('ApiomatCtrl', function ($log, $timeout) {

  $log.log('Hello from your Controller: ApiomatCtrl in module main:. This is your controller:', this);

  // form data bound to this object
  this.userInput = {};

  // holds some state information that can be bound
  this.state = {};
  this.submit = function () {
    this.state.submitting = true;

    $timeout(function () {
      $log.log(this.userInput);
      this.state.submitting = false;
    }.bind(this), 2000);
  };

  this.debugForm = function () {
    $log.log(this.form);
  };
});
