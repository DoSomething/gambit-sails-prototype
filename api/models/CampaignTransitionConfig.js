/**
 * Config model for Mobile Common campaign transition logic.
 */

module.exports = {
  connection: 'configMongoServer',
  migrate: 'safe',
  attributes: {
    // mData ID the user message will be coming from.
    mdataId: {
      type: 'integer',
      required: true,
      unique: true,
    },

    // Opt-in path ID to subscribe the user to.
    optinPathId: {
      type: 'integer',
      required: true
    },

    // Campaign ID to opt out the user from.
    optoutCampaignId: {
      type: 'integer',
      required: true
    },

    // Reference to the campaign config
    campaign: {
      model: 'campaignconfig'
    },
  }
};