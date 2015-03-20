/* global Provider, document */

var DOMCompiler = DOMCompiler || (function () {
  'use strict';
  return {
    bootstrap: function () {
      this.compile(document.children[0],
        Provider.get('$rootScope'));
    },
    compile: function (el, scope) {
      var dirs = this._getElDirectives(el);
      var dir;
      var scopeCreated;
      dirs.forEach(function (d) {
        dir = Provider.get(d.name + Provider.DIRECTIVES_SUFFIX);
        if (dir.scope && !scopeCreated) {
          scope = scope.$new();
          scopeCreated = true;
        }
        dir.link(el, scope, d.value);
      });
      Array.prototype.slice.call(el.children).forEach(function (c) {
        this.compile(c, scope);
      }, this);
    },
    _getElDirectives: function (el) {
      var attrs = el.attributes;
      var result = [];
      for (var i = 0; i < attrs.length; i += 1) {
        if (Provider.get(attrs[i].name + Provider.DIRECTIVES_SUFFIX)) {
          result.push({
            name: attrs[i].name,
            value: attrs[i].value
          });
        }
      }
      return result;
    }
  };
}());
