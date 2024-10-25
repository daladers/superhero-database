require("dotenv").config();
const express = require("express");
const mongoose = require("./config/database");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/superheroes", require("./routes/superhero"));
app.use("/images", require("./routes/image"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
