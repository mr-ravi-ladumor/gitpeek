import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`)
      console.log("MongoDB connected successfully : ", connectionInstance.connection.host);

    } catch (error) {
        console.error("MongoDB connection error : ", error.message);
        // process.exit(1); // Exit process with failure
    }
}

export default connectDB;