'use strict';
const require1 = require('../../.lib/require1');

module.exports = function help() {
  return Object.assign(
    {
      example_yuan: 100,
      percent: 10
    },
    require1('./com/com', __dirname)(false)
  );
};
