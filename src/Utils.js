var Utils = {
  equals: function (a, b) {
    'use strict';
    return JSON.stringify(a) === JSON.stringify(b);
  },
  clone: function (a) {
    'use strict';
    try {
      return JSON.parse(JSON.stringify(a));
    } catch (e) {
      return undefined;
    }
  }
};

