
const express = require("express");
const mongoose = require("mongoose");


const maidRoutes = require('./routes/maidroute');
const Maid = require("./models/maid")


const app = express();
const PORT = 2004;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/footer', (req, res) => {
    res.sendFile(__dirname + '/public/footer.html');
  });
  
// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/maidDb")
.then(() => console.log("Connected to MongoDB successfully..."))
.catch(err => console.log("Error connecting to MongoDB:", err.message));

// Routes
app.use('/', maidRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));


