var express = require('express');
var router = express.Router();

var address_api = require('../controller/address_api');

router.post('/saveAddress',address_api.addAddress);



module.exports = router;