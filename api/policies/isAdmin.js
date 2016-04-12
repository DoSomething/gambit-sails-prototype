'use strict';

var request = require('request');

module.exports = function(req, res, next) {
  if (typeof req.session.isAdmin !== 'undefined'
      && req.session.isAdmin === true) {
    return next();
  }

  if (typeof req.body === 'undefined'
      || typeof req.body.username !== 'string'
      || typeof req.body.password !== 'string') {
    return res.redirect('/login');
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
        && Object.keys(body.user.roles).indexOf(PhoenixService.ADMIN_ROLE) >= 0) {
      req.session.isAdmin = true;
      next();
    }
    else {
      return res.redirect('/login');
    }
  });
};