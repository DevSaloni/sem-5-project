const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/document'); // Folder for storing uploaded files
    },
    filename: (req, file, cb) => {
        // Generate a unique filename with timestamp
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Multer Upload Setup
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Define fields for document files
const uploadFields = upload.fields([
    { name: 'aadharUpload', maxCount: 1 },
    { name: 'rationUpload', maxCount: 1 },
    { name: 'passbookUpload', maxCount: 1 },
    { name: 'panUpload', maxCount: 1 },
    { name: 'voterIdUpload', maxCount: 1 }
]);

module.exports = uploadFields;
