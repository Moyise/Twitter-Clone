import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI: any = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB Connected: " + connection.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
