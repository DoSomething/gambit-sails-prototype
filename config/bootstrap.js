/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  if (! sails.config.phoenix.loginOnBootstrap) {
    sails.log.info('Did not log into Phoenix.');
    cb();
    return;
  }

  // Login to Phoenix to get session info for API calls
  PhoenixService.login(
    sails.config.phoenix.apiUsername,
    sails.config.phoenix.apiPassword,
    function(err, response, body) {
      if (response && response.statusCode == 200) {
        sails.log.info('Successfully logged in to the Phoenix API.',
          '\n\tsessid: ' + body.sessid,
          '\n\tsession_name: ' + body.session_name,
          '\n\ttoken: ' + body.token);
        sails.phoenixSessionId = body.sessid;
        sails.phoenixSessionName = body.session_name;
        sails.phoenixSessionToken = body.token;
      }
      else {
        sails.log.warn('Unable to login to Phoenix. Some important functionality may not work.');
      }

      // It's very important to trigger this callback method when you are finished
      // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      cb();
    }
  );

};
