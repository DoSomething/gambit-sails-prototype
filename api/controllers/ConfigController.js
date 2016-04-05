/**
 * The ConfigController handles the creation and management of SMS app
 * configuration.
 */

'use strict';

var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {

  /**
   * Display campaigns that have configurations set.
   */
  list: function(req, res) {
    YesNoConfig.find({}, function(err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.view('configList', {configs: results});
    });
  },

  /**
   * Display view to create a new campaign configuration.
   */
  createView: function(req, res) {
    return res.view(
      'configCampaign',
      {
        id: 'new',
        config: null
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
    YesNoConfig.findOne(req.params.campaignId, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!result) {
        return res.view('404');
      }

      return res.view(
        'configCampaign',
        {
          id: result.id,
          config: result
        }
      );
    });
  },

  /**
   * Handle the submission request to edit an existing campaign configuration.
   */
  editSubmit: function(req, res) {
    var updateValues = {
      campaign: req.body['campaign-name'],
      incomingOptInPathId: req.body['yesno-incoming-optin'],
      yesPath: req.body['yesno-yes-optin'],
      noPath: req.body['yesno-no-optin']
    };

    YesNoConfig.update(
      req.params.campaignId,
      updateValues,
      function(err, results) {
        if (err) {
          return res.status(500).send(err);
        }

        return res.redirect('/config');
      });
  },

};