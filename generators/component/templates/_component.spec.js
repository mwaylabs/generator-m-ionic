'use strict';

describe('module: <%= moduleName %>, component: <%= componentName %>', function () {
  var $componentController;

  beforeEach(module('<%= moduleName %>'));
  beforeEach(inject(function (_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('controller exists', function () {
    // Here we are passing actual bindings to the component
    var ctrl = $componentController('<%= componentName %>');

    expect(ctrl).toBeDefined();
  });
});
