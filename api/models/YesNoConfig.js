/**
 * Config model for yes/no paths.
 */

module.exports = {
  connection: 'configMongoServer',
  migrate: 'safe',

  attributes: {
    // Name of the campaign this is being used for.
    campaign: {
      type: 'string',
      required: true,
      unique: true,
    },

    // Opt-in path ID the user's message would be coming from.
    incomingOptInPathId: {
      type: 'integer',
      unique: true,
      required: true,
    },

    // Opt-in path ID to subscribe user to if they reply "yes."
    yesPath: {
      type: 'integer',
      required: true,
    },

    // Opt-in path ID to subscribe user to if they reply "no."
    noPath: {
      type: 'integer',
      required: true,
    },
  }, 
};