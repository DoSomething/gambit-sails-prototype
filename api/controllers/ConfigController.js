/**
 * The ConfigController handles the creation and management of SMS app
 * configuration.
 */

'use strict';

module.exports = {

  /**
   * Display campaigns that have configurations set.
   */
  home: function(req, res) {
    return res.view('configHome');
  },

  /**
   * Create a new campaign configuration.
   */
  create: function(req, res) {
    return res.view(
      'configCampaign',
      {
        campaignName: 'new',
      }
    );
  },

  /**
   * Edit an existing campaign configuration.
   */
  edit: function(req, res) {
    return res.view(
      'configCampaign',
      {
        campaignName: req.params.campaign,
      }
    );
  },

};