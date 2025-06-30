const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase =  () => {
   mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected Successfully.");
    })
    .catch((error) => {
      console.log("Failed to Connect", error);
    });
};

module.exports = { initializeDatabase };
