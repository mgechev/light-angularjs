var DOMCompiler = DOMCompiler || {
  bootstrap: function () {
    this.compile(document.children[0], Provider.get('$rootScope'));
  },
  callDirectives: function (dom, $scope) {
    var isCreated = false;
    [].map.call(dom.attributes || [], function (attr) {
        var directive = Provider.get(attr.name + Provider.DIRECTIVES_SUFFIX);
        return directive && {
          expr: attr.value,
          provision: directive
        };
      })
      .filter(Boolean)
      .forEach(function (d) {
        if (d.provision.scope && !isCreated) {
          isCreated = true;
          $scope = $scope.$new();
        }
        d.provision.link(dom, $scope, d.expr);
      });
    return $scope;
  },
  compile: function (dom, scope) {
    scope = this.callDirectives(dom, scope);
    [].forEach.call(dom.children || [], function (d) {
      this.compile(d, scope);
    }.bind(this));
  }
};