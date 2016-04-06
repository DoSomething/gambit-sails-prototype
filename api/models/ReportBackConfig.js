module.exports = {
  connection: 'configMongoServer',
  migrate: 'safe',
  attributes: {
    // Mobile Commons ID of the campaign just completed
    campaign_completed_id: {
      type: 'integer',
      required: true
    },

    // Drupal node ID
    campaign_nid: {
      type: 'integer',
      required: true,
    },

    // Mobile Commons campaign ID to opt user out of
    campaign_optout_id: {
      type: 'integer',
      required: true
    },

    // Hacky - use this to id a secondary reportback flow when there are multiple
    // flows for a single endpoint value
    config_override: {
      type: 'string',
      required: true
    },

    // Resource name used as endpoint in URL
    endpoint: {
      type: 'string',
      required: true,
      unique: true
    },

    // Mobile Commons opt-in path ID for successfully completed report back
    message_complete: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID for when the MMS response doesn't contain a photo
    message_not_a_photo: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID to ask for photo caption
    message_caption: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID of the error message indicating that the quantity submitted is invalid
    message_quantity_sent_invalid: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID to ask for quantity
    message_quantity: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID to ask why
    message_why: {
      type: 'integer',
      required: true
    },

    // Reference to the campaign config
    campaign: {
      model: 'campaignconfig'
    },
  }
};