const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const checkAuth = require('../middleware/checkAuth');

router.post('/upload', checkAuth, fileController.upload, fileController.handleUpload);

router.get('/download/:id', checkAuth, fileController.handleDownload);

router.delete('/:id', checkAuth, fileController.handleDelete);

module.exports = router;
