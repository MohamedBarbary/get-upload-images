// //require dotenv here
// const express = require("express");
// const app = express();
// const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config();

// const { storage } = require("./storage/storage");
// const multer = require("multer");
// const upload = multer({ storage });

// require("ejs");
// const port = 4009;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "./views"));

// app.get("", (req, res) => {
//   res.render("home");
// });

// // code goes here
// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Done");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
// Require dotenv here
const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { storage } = require("./storage/storage");
const multer = require("multer");
const upload = multer({ storage });

require("ejs");
const port = 4009;

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
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
