const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
function setCORSHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // Call next to proceed to the next middleware in the chain
}

app.use(setCORSHeaders);
const { storage } = require("./storage/storage");
const multer = require("multer");
const upload = multer({ storage });

require("ejs");
const port = 5005;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Home route
app.get("", (req, res) => {
  res.render("home");
});

// POST route for uploading images
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.params);
  res.send("Done");
});

// GET route for retrieving images by filename from Cloudinary
app.get("/getImage/:filename", (req, res) => {
  const { filename } = req.params;
  // Construct the URL for the image in Cloudinary based on the filename
  const imageUrl = cloudinary.url(`CustomFolder/${filename}.jpg`, {
    width: 200,
    height: 200,
    crop: "fill",
  });
  console.log(imageUrl);
  res.json({ imageUrl });
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
