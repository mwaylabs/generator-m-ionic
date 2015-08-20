'use strict';

describe('Debug page', function () {

  beforeEach(function () {
    browser.get('/#/main/debug');
  });

  it('should grade passwords', function () {

    var passwordInput = element(by.model('ctrl.password.input'));
    var passwordStrength = element(by.binding('ctrl.password.strength'));

    // weak
    passwordInput.sendKeys('my');
    expect(passwordStrength.getText()).toEqual('weak');
    expect(passwordStrength.getAttribute('class')).toContain('badge-assertive');

    // medium
    passwordInput.sendKeys('test');
    expect(passwordStrength.getText()).toEqual('medium');
    expect(passwordStrength.getAttribute('class')).toContain('badge-energized');

    // strong
    passwordInput.sendKeys('tesyasdft');
    expect(passwordStrength.getText()).toEqual('strong');
    expect(passwordStrength.getAttribute('class')).toContain('badge-balanced');

  });
});
