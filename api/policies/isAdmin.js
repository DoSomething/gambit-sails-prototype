'use strict';

var request = require('request');
var ADMIN_ROLE = '3';

module.exports = function(req, res, next) {
  if (typeof req.session.isAdmin !== 'undefined'
      && req.session.isAdmin === true) {
    return next();
  }

  // Log into Phoenix
  PhoenixService.login(req.body.username, req.body.password, function(err, response, body) {
    if (err) {
      return res.status(500).send({
        message: 'There was an error authenticating against Phoenix',
        data: err
      });
    }

    if (typeof body === 'object'
        && typeof body.user === 'object'
        && typeof body.user.roles === 'object'
        && Object.keys(body.user.roles).indexOf(ADMIN_ROLE) >= 0) {
      req.session.isAdmin = true;
      next();
    }
    else {
      return res.forbidden('You are not permitted to perform this action.');
    }
  });
};