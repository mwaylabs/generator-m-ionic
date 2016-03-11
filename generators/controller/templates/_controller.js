'use strict';
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', function ($log<% if(options.template === 'debug') { %>, $http, $timeout, <%= serviceName %>, <%= configName %>, $cordovaDevice<% } %>) {

  $log.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this);

<% if (options.template === 'debug') {-%>
  // bind data from services
  this.someData = <%= serviceName %>.someData;
  this.ENV = <%= configName %>.ENV;
  this.BUILD = <%= configName %>.BUILD;
  // get device info
  ionic.Platform.ready(function () {
    if (ionic.Platform.isWebView()) {
      this.device = $cordovaDevice.getDevice();
    }
  }.bind(this));

  // PASSWORD EXAMPLE
  this.password = {
    input: '', // by user
    strength: ''
  };
  this.grade = function () {
    var size = this.password.input.length;
    if (size > 8) {
      this.password.strength = 'strong';
    } else if (size > 3) {
      this.password.strength = 'medium';
    } else {
      this.password.strength = 'weak';
    }
  };
  this.grade();

  // Proxy
  this.proxyState = 'ready';
  this.proxyRequestUrl = <%= configName %>.ENV.SOME_OTHER_URL + '/get';

  this.proxyTest = function () {
    this.proxyState = '...';

    $http.get(this.proxyRequestUrl)
    .then(function (response) {
      $log.log(response);
      this.proxyState = 'success (result printed to browser console)';
    }.bind(this))
    .then($timeout(function () {
      this.proxyState = 'ready';
    }.bind(this), 6000));
  };

<% } -%>
});
