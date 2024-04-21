import mongoose from "mongoose"
import config from "./config"
import app from "./app";
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const main = async () => {
  try{
    await mongoose.connect(config.database_url as string);
    console.log("database connected successfully")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  } catch (error){
    console.error("Failed to connect")
  }
  
};

main();