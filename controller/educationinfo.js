const EducationalInfo = require("../models/educationinfo"); // Import your model

// Save educational information
const saveEducationInfo = async (req, res) => {
    try {
    console.log("Form Data:", req.body);  // Check for form fields data
        console.log("Uploaded Files:", req.files); 
        const educationalData = new EducationalInfo({
            role:req.body.role,
            highestQualification: req.body.highestQualification,
            fieldOfStudy: req.body.fieldOfStudy,
            schoolDetails: {
                schoolName: req.body.schoolName,
                schoolLocation: req.body.schoolLocation,
            },
            gradeDetails: {
                tenthGradePercentage: req.body.tenthGradePercentage,
                twelfthGradePercentage: req.body.twelfthGradePercentage,
                tenthMarksheet: req.files["tenthMarksheet"] ? req.files["tenthMarksheet"][0].path : null,
                twelfthMarksheet: req.files["twelfthMarksheet"] ? req.files["twelfthMarksheet"][0].path : null,
            },
            additionalQualifications: req.body.additionalQualifications,
            otherDocuments: req.files["otherDocuments"] ? req.files["otherDocuments"].map(file => file.path) : []
        });

        await educationalData.save();
        res.status(201).send("Educational information saved successfully");

    } catch (error) {
        console.error("Error saving educational information:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Retrieve educational information
const getEducationInfo = async (req, res) => {
    try {
        // Fetch all documents from the EducationalInfo collection
        const educationalData = await EducationalInfo.find();
        
        // Respond with the fetched data
        res.status(200).json(educationalData);

    } catch (error) {
        console.error("Error fetching educational information:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    saveEducationInfo,
    getEducationInfo,  // Export the new function
};
