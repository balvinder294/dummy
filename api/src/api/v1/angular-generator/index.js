const express = require('express');
const validate = require('express-validation');
const controller = require('./angular-generator.controller');
const validation = require('./angular-generator.validation');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

/**
 * @api {post} api/v1/angular-generator angularGenerator
 * @apiDescription Api for Generating Api for creating Angular App from UI
 * @apiVersion 1.0.0
 * @apiName angularGenerator
 * @apiPermission public
 *
 * @apiParam  {String} code  Test Code
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .post(validate(validation.angularGenerator), controller.angularGenerator);

router.route('/version')
  .get(controller.angularCliVersionCheck);

router.route('/check')
  .post(urlencodedParser,controller.checkPost);  

/**
 * @api {post} api/v1/angular-generator
 * @apiDescription Api for generating Angular-Cli app From UI
 * 
 * @apiParam {body} Json Object including params {appName} string {skipInstall} boolean
 * 
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/generate-angular-cli')
  .post(urlencodedParser,controller.generateAngularCliApp);

module.exports = router;
