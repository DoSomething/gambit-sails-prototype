/**
 * Keep track of and process a user's reportback workflow.
 */

'use strict';

module.exports = {

  /**
   * @todo IMPLEMENT ME
   */
  handle: function(req, res) {
    res.status(200).send({campaign: req.params.campaign});
  }

};