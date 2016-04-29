'use strict';

describe('module: <%= moduleName %>, controller: ApiomatCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= moduleName %>'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ApiomatCtrl;
  var $timeout;
  beforeEach(inject(function ($controller, _$timeout_) {
    ApiomatCtrl = $controller('ApiomatCtrl');
    $timeout = _$timeout_;
  }));

  it('should set state.submitting while submitting', function () {
    ApiomatCtrl.submit();
    expect(ApiomatCtrl.state.submitting).toBe(true);
    $timeout.flush();
    expect(ApiomatCtrl.state.submitting).toBe(false);
  });

});
