'use strict';

describe('module: main, service: Main', function () {

  // load the service's module
  beforeEach(module('main'));
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Main;
  var $timeout;
  var $httpBackend;
  beforeEach(inject(function (_Main_, _$timeout_, _$httpBackend_) {
    Main = _Main_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
  }));

  it('should do something', function () {
    expect(!!Main).toBe(true);
  });

  describe('.changeBriefly()', function () {
    beforeEach(function () {
      Main.changeBriefly();
    });
    it('should briefly change', function () {
      expect(Main.someData.binding).toEqual('Yeah this was changed');
      $timeout.flush();
      expect(Main.someData.binding).toEqual('Yes! Got that databinding working');
    });
  });

});
