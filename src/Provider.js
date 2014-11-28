/* global Scope */

var Provider = Provider || (function () {
  'use strict';

  return {
    get: function (name, locals) {
      if (this._cache[name]) {
        return this._cache[name];
      }
      var provider = this._providers[name];
      if (!provider || typeof provider !== 'function') {
        return null;
      }
      return (this._cache[name] = this.invoke(provider, locals));
    },
    directive: function (name, fn) {
      this._register(name + Provider.DIRECTIVES_SUFFIX, fn);
    },
    controller: function (name, fn) {
      this._register(name + Provider.CONTROLLERS_SUFFIX, function () {
        return fn;
      });
    },
    service: function (name, fn) {
      this._register(name, fn);
    },
    annotate: function (fn) {
      var res = fn.toString()
          .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
          .match(/\((.*?)\)/);
      if (res && res[1]) {
        return res[1].split(',').map(function (d) {
          return d.trim();
        });
      }
      return [];
    },
    invoke: function (fn, locals) {
      locals = locals || {};
      var deps = this.annotate(fn).map(function (s) {
        return locals[s] || this.get(s, locals);
      }, this);
      return fn.apply(null, deps);
    },
    _cache: { $rootScope: new Scope() },
    _providers: {},
    _register: function (name, service) {
      this._providers[name] = service;
    }
  };
}());

Provider.DIRECTIVES_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

