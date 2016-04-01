/**
 * The MobileCommonsController provides functionality specific to the DS use of
 * the Mobile Commons platform.
 */

'use strict';

module.exports = {

  /**
   * @todo IMPLEMENT ME
   */
  campaignTransition: function(req, res) {
    res.status(204).send();
  },

  /**
   * Opt the user into one of two Mobile Commons opt-in paths depending on
   * whether the response is a 'yes' or 'no'.
   */
  yesNoRouting: function(req, res) {

    if (req.body.args === undefined || req.body.opt_in_path_id === undefined) {
      res.status(204).send();
      return;
    }

    var userMessage = req.body.args.trim().toLowerCase();
    var incomingOptIn = parseInt(req.body.opt_in_path_id);

    YesNoConfig.findOne({incomingOptInPathId: incomingOptIn}, function(err, model) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Just check based on the first word in the message.
      let msgWords = userMessage.split(' ');
      let firstWord = msgWords[0];

      // Default to the 'no' response.
      let optin = model.noPath;
      let yesAnswers = ['y', 'ya', 'yea', 'yeah', 'yep', 'yes', 'yup'];
      for (let i = 0; i < yesAnswers.length; i++) {
        if (yesAnswers[i] === firstWord) {
          optin = model.yesPath;
          break;
        }
      }

      res.status(200).send({phone: req.body.phone, optin: optin});
      MobileCommonsService.sendSMS(req.body.phone, optin);
    });

  }

};