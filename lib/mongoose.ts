import mongoose from "mongoose";

export const mongooseConnect = async () => {
  const uri = process.env.MONGODB_URI || "";

  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    } else {
      return mongoose.connect(uri);
    }
  } catch (e) {
    console.log("CONNECTION FAILED");
  }
};
