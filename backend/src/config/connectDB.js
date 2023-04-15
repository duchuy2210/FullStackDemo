const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect DB successfully")
  } catch (error) {
    console.log("connect DB error ")
  }
}
export default connectDB;