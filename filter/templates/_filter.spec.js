'use strict';

describe('module: <%= moduleName %>, filter: <%= filterName %>', function () {

  // load the filter's module
  beforeEach(module('<%= moduleName %>'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // initialize a new instance of the filter before each test
  var $filter;
  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_('<%= filterName %>');
  }));

  it('should return the input prefixed with "<%= filterName %> filter:"', function () {
    var text = 'angularjs';
    expect($filter(text)).toBe('<%= filterName %> filter: ' + text);
  });

});
