const express = require('express');

const router = express.Router();
const angularGeneratorRoute = require('./angular-generator');


router.use('/angular-generator', angularGeneratorRoute);


module.exports = router;
