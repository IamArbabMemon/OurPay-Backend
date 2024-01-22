import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userProfileSchema = new mongoose.Schema({

   username:{
    type:String,
    trim:true,
    required:true
   },
   
   email:{
    type:String,
    trim:true,
    required:true,
    unique:true,
    validate: (value) => value.includes('@'),
   },

   mobileNumber:{
    type:String,
    trim:true,
    required:true,
    unique:true,
    validate : (value) => value.length === 11
   },

   city:{
    type:String,
    trim:true,
    required:true,
   },

   DOB:{
    type:Date,
    required:true,
   },

   nicFrontPic:{
    type:String,
    trim:true,
    required:true
   },

   nicBackPic:{
    type:String,
    trim:true,
    required:true
   },

   secret:{
    question: String,
    answer : {
        type:String,
        set:(value) => bcrypt.hashSync(value,10)
    }

   }

},{timestamps:true})

export const model = mongoose.model('userProfile',userProfileSchema);

