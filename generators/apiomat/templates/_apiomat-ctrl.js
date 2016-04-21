'use strict';
angular.module('<%= moduleName %>')
.controller('ApiomatCtrl', function ($scope, $log) {

  $log.log('Hello from your Controller: ApiomatCtrl in module main:. This is your controller:', this);
  this.printForm = function () {
    console.log(this.form);
  };
});
