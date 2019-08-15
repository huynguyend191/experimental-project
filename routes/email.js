const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.get('/send', mailController.sendMail);

module.exports = router;
