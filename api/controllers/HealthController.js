/**
 * Controller for API health checks.
 */

'use strict';

module.exports = {
  check: function(req, res) {
    return res.status(200).send({
      status: 'ok',
      session: req.session
    });
  }
};