const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const multer = require("multer");
const session = require('express-session');


const userRoute = require("./router/user");
const staticRoute = require("./router/saticRouter");
const personalInfoRoutes = require("./router/personalinfo");
const educationalInfoRoutes = require("./router/educationinfo");
const EducationalInfo = require("./models/educationinfo"); // Import your model
const documentInfoRoutes = require("./router/documentinfo");
const emergencyConatactInfoRoute = require("./router/emergencyConatact");
const maidSearchRoute = require("./router/userRequirement");
const authRoute = require("./router/auth");
const planeRoutes = require("./router/plane");
const applicationRoutes = require("./router/maidjobapply");
const logoutRoutes = require("./router/logout");



const app = express();
const PORT = 2004;

//middleware for session 
app.use(
    session({
        secret: 'my-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder for file uploads
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for file size
});

const uploadFields = upload.fields([
  { name: 'tenthMarksheet', maxCount: 1 },
  { name: 'twelfthMarksheet', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 5 } // Allow up to 5 additional documents
]);

// Route for uploading files
app.post('/educationalInfo/submitEducationalInfo', uploadFields, async (req, res) => {
  try {
      // Extract form and file data
      const educationalData = new EducationalInfo({
        role:req.body.role,
          highestQualification: req.body.highestQualification,
          fieldOfStudy: req.body.fieldOfStudy,
          schoolDetails: {
              schoolName: req.body.schoolName,
              schoolLocation: req.body.schoolLocation
          },
          gradeDetails: {
              tenthGradePercentage: req.body.tenthGradePercentage,
              twelfthGradePercentage: req.body.twelfthGradePercentage,
              tenthMarksheet: req.files['tenthMarksheet'] ? req.files['tenthMarksheet'][0].path : null,
              twelfthMarksheet: req.files['twelfthMarksheet'] ? req.files['twelfthMarksheet'][0].path : null
          },
          additionalQualifications: req.body.additionalQualifications,
          otherDocuments: req.files['otherDocuments'] ? req.files['otherDocuments'].map(file => file.path) : []
      });

      // Save to database
      await educationalData.save();
      res.status(201).send('Educational information saved successfully');
  } catch (error) {
      console.error("Error saving educational information:", error);
      res.status(500).send("An error occurred while saving data.");
  }
});
// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/WorkerDb")
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.log("Error connecting to MongoDB:", err.message));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Route Setup
app.use("/user", userRoute);
app.use("/", staticRoute); 
app.use("/personalInfo", personalInfoRoutes);
app.use("/educationalInfo", educationalInfoRoutes);
app.use("/documentsInfo" , documentInfoRoutes);
app.use("/emergencyContactInfo" , emergencyConatactInfoRoute);
app.use("/" , maidSearchRoute);
app.use(authRoute);
app.use(planeRoutes);
app.use(applicationRoutes);
app.use('/auth'  , logoutRoutes);




// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

module.exports = uploadFields;
