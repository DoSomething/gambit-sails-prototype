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
    CampaignConfig.find({})
      .populateAll()
      .then(function(results) {
        return res.view('configList', {configs: results});
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
  },

  /**
   * Display view to create a new campaign configuration.
   */
  createView: function(req, res) {
    return res.view('configCampaign', {id: 'new'});
  },

  /**
   * Handle the submission request to create a new campaign configuration.
   */
  createSubmit: function(req, res) {
    var ctModel;
    var rbModel;
    var ynModel;
    var campaignModel;

    var transitionConfig = {
      mdataId: req.body['transition-mdata'],
      optinPathId: req.body['transition-optin'],
      optoutCampaignId: req.body['transition-optout']
    };

    var reportbackConfig = {
      campaignCompletedId: req.body['rb-campaign-completed-id'],
      campaignNid: req.body['rb-campaign-nid'],
      campaignOptoutId: req.body['rb-campaign-optout-id'],
      configOverride: req.body['rb-config-override'],
      endpoint: req.body['rb-endpoint'],
      messageComplete: req.body['rb-msg-complete'],
      messageNotAPhoto: req.body['rb-msg-not-a-photo'],
      messageCaption: req.body['rb-msg-caption'],
      messageQuantitySentInvalid: req.body['rb-msg-quantity-invalid'],
      messageQuantity: req.body['rb-msg-quantity'],
      messageWhy: req.body['rb-msg-why']
    };

    var yesNoConfig = {
      incomingOptInPathId: req.body['yesno-incoming-optin'],
      yesPath: req.body['yesno-yes-optin'],
      noPath: req.body['yesno-no-optin']
    };

    // Create the transition config
    CampaignTransitionConfig.create(transitionConfig)
      .then(function(model) {
        ctModel = model;

        // Create the reportback config
        return ReportBackConfig.create(reportbackConfig);
      })
      .then(function(model) {
        rbModel = model;

        // Create the yes/no config
        return YesNoConfig.create(yesNoConfig);
      })
      .then(function(model) {
        ynModel = model;

        let config = {
          campaign: req.body['campaign-name'],
          reportbackConfig: rbModel.id,
          transitionConfig:  ctModel.id,
          yesNoConfig: ynModel.id
        };

        // Create the umbrella campaign config
        return CampaignConfig.create(config);
      })
      .then(function(model) {
        campaignModel = model;

        // Update the transition config with the campaign reference
        return CampaignTransitionConfig.update(ctModel.id, {campaign: campaignModel.id});
      })
      .then(function(results) {
        // Update the reportback config with the campaign reference
        return ReportBackConfig.update(rbModel.id, {campaign: campaignModel.id});
      })
      .then(function(results) {
        // Update the yes/no config with the campaign reference
        return YesNoConfig.update(ynModel.id, {campaign: campaignModel.id});
      })
      .then(function(results) {
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
    CampaignConfig.findOne(req.params.campaignId)
      .populateAll()
      .then(function(result) {
        if (!result) {
          return res.view('404');
        }

        let viewData = {};
        viewData.id = result.id;
        viewData.config = result;

        return res.view('configCampaign', viewData);
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
  },

  /**
   * Handle the submission request to edit an existing campaign configuration.
   */
  editSubmit: function(req, res) {
    var reportbackId;
    var transitionId;
    var yesNoId;

    var reportbackUpdate = {
      campaignCompletedId: req.body['rb-campaign-completed-id'],
      campaignNid: req.body['rb-campaign-nid'],
      campaignOptoutId: req.body['rb-campaign-optout-id'],
      configOverride: req.body['rb-config-override'],
      endpoint: req.body['rb-endpoint'],
      messageComplete: req.body['rb-msg-complete'],
      messageNotAPhoto: req.body['rb-msg-not-a-photo'],
      messageCaption: req.body['rb-msg-caption'],
      messageQuantitySentInvalid: req.body['rb-msg-quantity-invalid'],
      messageQuantity: req.body['rb-msg-quantity'],
      messageWhy: req.body['rb-msg-why']
    };

    var transitionUpdate = {
      mdataId: req.body['transition-mdata'],
      optinPathId: req.body['transition-optin'],
      optoutCampaignId: req.body['transition-optout']
    };

    var yesNoUpdate = {
      incomingOptInPathId: req.body['yesno-incoming-optin'],
      yesPath: req.body['yesno-yes-optin'],
      noPath: req.body['yesno-no-optin']
    };

    // Update the umbrella campaign config
    CampaignConfig.update(req.params.campaignId, {campaign: req.body['campaign-name']})
      .then(function(results) {
        reportbackId = results[0].reportbackConfig;
        transitionId = results[0].transitionConfig;
        yesNoId = results[0].yesNoConfig;

        // Update the transition config
        return CampaignTransitionConfig.update(transitionId, transitionUpdate);
      })
      .then(function(results) {
        // Update the report back config
        return ReportBackConfig.update(reportbackId, reportbackUpdate);
      })
      .then(function(results) {
        // Update the yes/no config
        return YesNoConfig.update(yesNoId, yesNoUpdate);
      })
      .then(function(results) {
        return res.redirect('/config');
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
  },

  /**
   * Removes a campaign configuration from the database.
   */
  delete: function(req, res) {
    var reportbackId;
    var transitionId;
    var yesNoId;
    var campaignId = req.params.campaignId;

    CampaignConfig.findOne(campaignId)
      .then(function(result) {
        reportbackId = result.reportbackConfig;
        transitionId = result.transitionConfig;
        yesNoId = result.yesNoConfig;

        return CampaignTransitionConfig.destroy(transitionId);
      })
      .then(function() {
        return ReportBackConfig.destroy(reportbackId);
      })
      .then(function() {
        return YesNoConfig.destroy(yesNoId);
      })
      .then(function() {
        return CampaignConfig.destroy(campaignId);
      })
      .then(function() {
        return res.redirect('/config');
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
  }

};