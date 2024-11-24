const Document = require("../models/documentinfo");

const saveDocumentData = async (req, res) => {
    try {
        // Extract and save data from the form and file uploads
        const documentData = new Document({
            role:req.body.role,
            aadharNumber: req.body.aadharNumber,
            rationCardNumber: req.body.rationCardNumber,
            accountNumber: req.body.accountNumber,
            panNumber: req.body.panNumber,
            voterId: req.body.voterId,
            aadharUpload: req.files['aadharUpload'] ? req.files['aadharUpload'][0].path : null,
            rationUpload: req.files['rationUpload'] ? req.files['rationUpload'][0].path : null,
            passbookUpload: req.files['passbookUpload'] ? req.files['passbookUpload'][0].path : null,
            panUpload: req.files['panUpload'] ? req.files['panUpload'][0].path : null,
            voterIdUpload: req.files['voterIdUpload'] ? req.files['voterIdUpload'][0].path : null
        });

        // Save the data in the database 
        await documentData.save();
        res.status(201).send('Document data saved successfully');
    } catch (error) {
        console.error("Error saving document data:", error);
        res.status(500).send("An error occurred while saving document data.");
    }
};
// Get Document Data
const getDocumentData = async (req, res) => {
    try {
        // Find all documents (or apply filters if needed)
        const documents = await Document.find(); // Retrieves all records in the Document collection
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error retrieving document data:", error);
        res.status(500).send("An error occurred while retrieving document data.");
    }
};

 

module.exports = { saveDocumentData  , getDocumentData};