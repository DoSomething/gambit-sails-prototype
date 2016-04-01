/**
 * Service for Mobile Commons API calls.
 */

var RequestRetry = require('node-request-retry');

module.exports = {

  /**
   * Opts a user into a Mobile Commons opt-in path. Can effectively be used to
   * send an SMS response to a user.
   *
   * @param phone {string} The user's phone number
   * @param optin {number} ID of the opt-in path to subscribe the user to
   * @param profileFields {object} Custom fields to assign to the user's MC profile
   */
  optin: function(phone, optin, profileFields) {
    var url = 'https://secure.mcommons.com/api/profile_update';
    var authEmail = process.env.MOBILECOMMONS_AUTH_EMAIL;
    var authPass = process.env.MOBILECOMMONS_AUTH_PASS;

    var postData = {
      auth: {
        user: sails.config.mobilecommons.email,
        pass: sails.config.mobilecommons.password
      },
      form:{
        phone_number: phone,
        opt_in_path_id: optin
      }
    };

    if (typeof profileFields == 'object') {
      var profileFieldKeys = Object.keys(profileFields);
      for (var i = 0; i < profileFieldKeys.length; i++) {
        var key = profileFieldKeys[i];
        postData.form[key] = profileFields[key];
      }
    }

    // If we're in a test env, just log and emit an event.
    if (process.env.NODE_ENV == 'test') {
      console.log('mobilecommons.profile_update: ', phone, ' | ', optin, ' | ', profileFields);
      return;
    }

    var trace = new Error().stack;
    var callback = function(error, response, body) {
      if (error) {
        console.error('Failed mobilecommons.profile_update for user phone: '
          + phone + ' | form data: ' + JSON.stringify(postData.form) 
          + ' | error: ' + error + ' | stack: ' + trace);
      }
      else if (response && response.statusCode != 200) {
        console.error('Failed mobilecommons.profile_update for user phone: '
          + phone + ' | form data: ' + JSON.stringify(postData.form)
          + '| with code: ' + response.statusCode 
          + ' | body: ' + body + ' | stack: ' + trace);
      }
    };

    var requestRetry = new RequestRetry();
    requestRetry.setRetryConditions([400, 408, 500]);
    requestRetry.post(url, postData, callback);
  },

  /**
   * @todo IMPLEMENT ME
   */
  optout: function() {
  },

  /**
   * @todo IMPLEMENT ME
   */
  profileUpdate: function() {
  },

};