const express = require("express");
const router = express.Router();
const Maid = require("../models/maid");
const SignIn = require("../models/sigin");
const Login = require("../models/Login");

const multer = require("multer");
const allowedFileTypes = {
  aadharCard: {
    mimetypes: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  resume: {
    mimetypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const fileConfig = allowedFileTypes[file.fieldname];

    if (!fileConfig) {
      cb(new Error("Unexpected field"), false);
      return;
    }

    if (fileConfig.mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: {
    fileSize: Math.max(
      ...Object.values(allowedFileTypes).map((type) => type.maxSize)
    ),
  },
});
router.post(
  "/apply-job",
  //   upload.fields([
  //     { name: "aadharCard", maxCount: 1 },
  //     { name: "resume", maxCount: 1 },
  //   ]),
  async (req, res) => {
    try {
      const maidData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        experience: req.body.experience,
        // aadharCard: req.files.aadharCard[0].path,
        reference: req.body.reference,
        // resume: req.files.resume[0].path,
        verified: false, // Maid is not verified initially
      };

      const newMaid = new Maid(maidData);
      await newMaid.save();
      res.send("Application submitted successfully.");
    } catch (error) {
      res.status(500).send("Error saving maid application.");
    }
  }
);

router.get("/search-maid", async (req, res) => {
  try {
    const {
      serviceType,
      location,
      experience,
      availableDate,
      availableTime,
      budgetMin,
      budgetMax,
      rating,
    } = req.query;

    const query = {
      ...(serviceType && { serviceType }),
      ...(location && { location }),
      ...(experience && { experience }),
      ...(availableDate && { availableDate }),
      ...(availableTime && { availableTime }),
      ...(rating && { rating: { $gte: parseInt(rating) } }),
      ...(budgetMin &&
        budgetMax && {
          budgetPerHour: {
            $gte: parseInt(budgetMin),
            $lte: parseInt(budgetMax),
          },
        }), // Ensure 'budgetPerHour' matches the schema
    };

    const results = await Maid.find(query);
    res.render("search-result", { results });
  } catch (err) {
    console.error("Error searching for maid data:", err);
    res.status(500).send("An error occurred while searching for maid.");
  }
});

router.post("/sign-in", (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Basic validation example
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  // Simulate saving user data and return success
  res.status(200).send("User registered successfully.");
});

router.post("/log-in", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Login.findOne({ email });
    if (user) {
      user.lastLogin = new Date();
      await user.save();
      res.json({ message: "User logged in successfully!" });
    } else {
      res.status(400).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
});

module.exports = router;
