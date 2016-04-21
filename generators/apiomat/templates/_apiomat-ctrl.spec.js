'use strict';

describe('module: main, controller: ApiomatCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ApiomatCtrl;
  beforeEach(inject(function ($controller) {
    ApiomatCtrl = $controller('ApiomatCtrl');
  }));

  it('should do something', function () {
    expect(!!ApiomatCtrl).toBe(true);
  });

});
