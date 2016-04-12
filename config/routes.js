/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  /**
   * Login view
   */
  'get  /login': 'LoginController.view',
  'post /login': 'LoginController.login',

  /**
   * Admin config views.
   */

  'get  /config': 'ConfigController.index',
  'get  /config/new': 'ConfigController.new',
  'post /config/new': 'ConfigController.create',
  'get  /config/:id': 'ConfigController.findOne',
  'post /config/:id': 'ConfigController.update',
  'post /config/:id/destroy': 'ConfigController.destroy',

  // @todo I can't figure out what needs to be done to get something like below to work
  // instead of explicitly defining all the routes and actions like above.
  // '/config': {
  //   controller: 'ConfigController'
  // },

  /**
   * API routes.
   */

  // Health check
  'get /health': 'HealthController.check',

  // DoSomething.org custom Mobile Commons extensions via mDatas
  // @see https://dosomething.mcommons.com/mdatas
  // @see https://mobilecommons.zendesk.com/hc/en-us/articles/202052304-mData
  // @see https://mobilecommons.zendesk.com/hc/en-us/articles/202052494-mData-web-services
  'post /mc/campaign-transition': 'MobileCommonsController.campaignTransition',
  'post /mc/yes-no-routing': 'MobileCommonsController.yesNoRouting',
  'post /mc/reportback/:campaign': 'ReportbackController.handle',

};
