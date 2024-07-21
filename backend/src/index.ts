import express from "express";
import mongoose from "mongoose";
import router from "./routes";
import dotenv from "dotenv"
dotenv.config();
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;
if (!URL) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
  }
mongoose.connect(URL).then(()=>{
    console.log("Database connected");
    app.use("/", router)
    app.use('/uploads', express.static('uploads'));
    app.listen(PORT, ()=>{
    console.log('Server runnging on http://localhost:8000')
});
}).catch((error)=>console.log(error))
