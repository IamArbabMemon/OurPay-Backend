import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try{

        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log('DATABASE HAS BEEN CONNECTED !!');

    }catch(err){
        console.log('DATABASE CONNECTION HAS FAILED !!',err);
        process.exit(1);
    }
}

export default connectDB