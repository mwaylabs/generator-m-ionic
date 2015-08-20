'use strict';

describe('module: main, controller: DebugCtrl', function () {

  // load the service's module
  beforeEach(module('main'));
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var DebugCtrl;
  beforeEach(inject(function ($controller) {
    DebugCtrl = $controller('DebugCtrl');
  }));

  it('should do something', function () {
    expect(!!DebugCtrl).toBe(true);
  });

  describe('.grade()', function () {

    it('should classify asd as weak', function () {
      DebugCtrl.password.input = 'asd';
      DebugCtrl.grade();
      expect(DebugCtrl.password.strength).toEqual('weak');
    });

    it('should classify asdf as medium', function () {
      DebugCtrl.password.input = 'asdf';
      DebugCtrl.grade();
      expect(DebugCtrl.password.strength).toEqual('medium');
    });

    it('should classify asdfasdfasdf as strong', function () {
      DebugCtrl.password.input = 'asdfasdfasdf';
      DebugCtrl.grade();
      expect(DebugCtrl.password.strength).toEqual('strong');
    });
  });

});
