import mongoose from "mongoose"

async function dbCallback() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database");
  } catch (error) {
    throw error
  }
}

export default dbCallback