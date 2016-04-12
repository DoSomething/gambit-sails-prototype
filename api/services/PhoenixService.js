/**
 * Service for Phoenix API calls.
 */

'use strict';

var request = require('request');

module.exports = {
  /**
   * Admin role constant.
   */
  ADMIN_ROLE: '3',

  /**
   * User login.
   *
   * @param username {string}
   * @param password {string}
   * @param callback {function}
   */
  login: function(username, password, callback) {
    let options = {
      url: sails.config.phoenix.url + '/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: {
        username: username,
        password: password
      },
      json: true
    };

    // Log into Phoenix
    request(options, function(err, response, body) {
      callback(err, response, body);
    });
  },

};