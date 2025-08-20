const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGO_URI) {
  console.error(" MONGO_URI is missing. Did you set it in Render Environment?");
  process.exit(1); }

console.log(" MONGO_URI loaded from env ");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.error(" Database connection error:", err.message);
  });
