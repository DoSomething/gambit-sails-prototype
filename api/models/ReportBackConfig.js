module.exports = {
  connection: 'configMongoServer',
  migrate: 'safe',
  attributes: {
    // Mobile Commons ID of the campaign just completed
    campaignCompletedId: {
      type: 'integer',
      required: true
    },

    // Drupal node ID
    campaignNid: {
      type: 'integer',
      required: true,
    },

    // Mobile Commons campaign ID to opt user out of
    campaignOptoutId: {
      type: 'integer',
      required: true
    },

    // Hacky - use this to id a secondary reportback flow when there are multiple
    // flows for a single endpoint value
    configOverride: {
      type: 'string'
    },

    // Resource name used as endpoint in URL
    endpoint: {
      type: 'string',
      required: true,
      unique: true
    },

    // Mobile Commons opt-in path ID for successfully completed report back
    messageComplete: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID for when the MMS response doesn't contain a photo
    messageNotAPhoto: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID to ask for photo caption
    messageCaption: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID of the error message indicating that the quantity submitted is invalid
    messageQuantitySentInvalid: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID to ask for quantity
    messageQuantity: {
      type: 'integer',
      required: true
    },

    // Mobile Commons opt-in path ID to ask why
    messageWhy: {
      type: 'integer',
      required: true
    },

    // Reference to the campaign config
    campaign: {
      model: 'campaignconfig'
    },
  }
};