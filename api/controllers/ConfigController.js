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
    // @todo Could be doing something wrong, but unable to find the document
    // by its ID. Will just loop through results and find it there instead.
    YesNoConfig.find({}, function(err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      let config = null;
      for (let i = 0; i < results.length; i++) {
        if (results[i].id === req.params.campaignId) {
          config = results[i];
          break;
        }
      }

      if (!config) {
        return res.view('404');
      }

      return res.view(
        'configCampaign',
        {
          config: config
        }
      );
    });
  },

  /**
   * Handle the submission request to edit an existing campaign configuration.
   */
  editSubmit: function(req, res) {
    res.ok();
  },

};