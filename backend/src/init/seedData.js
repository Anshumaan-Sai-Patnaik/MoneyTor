require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const Holding = require("../models/holding");
const Position = require("../models/position");
const { holdings, positions } = require("../data/data");

async function seedData() {
  try {
    await connectDB();
    console.log("Seeding Data...");
    for (const item of holdings) {
      await new Holding(item).save();
    }
    for (const item of positions) {
      await new Position(item).save();
    }
    console.log("Seeding complete");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}
seedData();