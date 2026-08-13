const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connection Successful');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;