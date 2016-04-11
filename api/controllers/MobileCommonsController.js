/**
 * The MobileCommonsController provides functionality specific to the DS use of
 * the Mobile Commons platform.
 */

'use strict';

module.exports = {

  /**
   * Transition users from one Mobile Commons campaign to another. This is done
   * by opting the user into the optin path of one campaign and opting them out
   * of another.
   */
  campaignTransition: function(req, res) {
    if (typeof(req.body.mdata_id) === 'undefined') {
      res.status(204).send();
      return;
    }

    var mdataId = parseInt(req.body.mdata_id);
    CampaignTransitionConfig.findOne({mdataId: mdataId})
      .then(function(model) {
        if (typeof model === 'undefined'
            || typeof model.optinPathId === 'undefined'
            || typeof model.optoutCampaignId === 'undefined') {
          throw new Error();
        }

        MobileCommonsService.optin(req.body.phone, model.optinPathId);
        MobileCommonsService.optout(req.body.phone, model.optoutCampaignId);

        res.status(200).send();
      })
      .catch(function(err) {
        // Config for that mData is not set.
        res.status(501).send();
      });
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
      MobileCommonsService.optin(req.body.phone, optin);
    });

  }

};