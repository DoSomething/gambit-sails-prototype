/**
 * The ConfigController handles the creation and management of SMS app
 * configuration.
 */

'use strict';

module.exports = {

  /**
   * Display campaigns that have configurations set.
   */
  list: function(req, res) {
    return res.view('configList');
  },

  /**
   * Display view to create a new campaign configuration.
   */
  createView: function(req, res) {
    return res.view(
      'configCampaign',
      {
        campaignName: 'new',
      }
    );
  },

  /**
   * Handle the submission request to create a new campaign configuration.
   */
  createSubmit: function(req, res) {
    var yesNoConfig = {
      campaign: req.body['campaign-name'],
      incomingOptInPathId: req.body['yesno-incoming-optin'],
      yesPath: req.body['yesno-yes-optin'],
      noPath: req.body['yesno-no-optin']
    };

    YesNoConfig.create(yesNoConfig)
      .then(function(config) {
        res.redirect('/config');
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  },

  /**
   * Display the view to edit an existing campaign configuration.
   */
  editView: function(req, res) {
    return res.view(
      'configCampaign',
      {
        campaignName: req.params.campaign,
      }
    );
  },

  /**
   * Handle the submission request to edit an existing campaign configuration.
   */
  editSubmit: function(req, res) {
    res.ok();
  },

};