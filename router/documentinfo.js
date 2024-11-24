const express = require('express');
const router = express.Router();
const { saveDocumentData } = require('../controller/documentinfo');
const uploadFields = require('../middleware/multerConfig');

// Route for uploading documents
router.post('/submitDocumentsInfo', uploadFields, saveDocumentData);

module.exports = router;
