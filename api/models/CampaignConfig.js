module.exports = {
  connection: 'configMongoServer',
  migrate: 'safe',
  attributes: {
    campaign: {
      type: 'string',
      required: true,
      unique: true,
    },

    reportbackConfig: {
      model: 'reportbackconfig'
    },

    transitionConfig: {
      model: 'campaigntransitionconfig'
    },

    yesNoConfig: {
      model: 'yesnoconfig'
    },
  }
};