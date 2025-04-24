import moongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
  try {
    const connect = await moongoose.connect(process.env.MongoDB_URI);
    console.log('MongoDB connected successfully: ', connect.connection.host);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};