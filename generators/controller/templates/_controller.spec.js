'use strict';

describe('module: <%= moduleName %>, controller: <%= controllerName %>', function () {

  // load the controller's module
  beforeEach(module('<%= moduleName %>'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var <%= controllerName %>;
  beforeEach(inject(function ($controller) {
    <%= controllerName %> = $controller('<%= controllerName %>');
  }));

<% if (options.template !== 'debug') { -%>
  it('should do something', function () {
    expect(!!<%= controllerName %>).toBe(true);
  });

<% } else { -%>
  describe('.grade()', function () {

    it('should classify asd as weak', function () {
      <%= controllerName %>.password.input = 'asd';
      <%= controllerName %>.grade();
      expect(<%= controllerName %>.password.strength).toEqual('weak');
    });

    it('should classify asdf as medium', function () {
      <%= controllerName %>.password.input = 'asdf';
      <%= controllerName %>.grade();
      expect(<%= controllerName %>.password.strength).toEqual('medium');
    });

    it('should classify asdfasdfasdf as strong', function () {
      <%= controllerName %>.password.input = 'asdfasdfasdf';
      <%= controllerName %>.grade();
      expect(<%= controllerName %>.password.strength).toEqual('strong');
    });
  });

<% } -%>
});
