'use strict';

module.exports = {

  view: function(req, res) {
    return res.view('login', {showError: req.query.error});
  },

  login: function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    PhoenixService.login(username, password, function(err, response, body) {
      if (err) {
        return res.status(500).send(err);
      }

      if (typeof body === 'object'
        && typeof body.user === 'object'
        && typeof body.user.roles === 'object'
        && Object.keys(body.user.roles).indexOf(PhoenixService.ADMIN_ROLE) >= 0) {

        req.session.isAdmin = true;
        return res.redirect('config');

      }
      else {
        return res.redirect('login?error=true');
      }

    });
  },

};