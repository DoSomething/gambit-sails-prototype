/**
 * Controller for API health checks.
 */

'use strict';

module.exports = {
  check: function(req, res) {
    return res.send({status: 'ok'});
  }
};