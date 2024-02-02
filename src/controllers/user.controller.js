import userModel from '../models/user.model.js'
import uploadFileOnCloudinary from '../utils/cloudinaryUploader.js';
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js'
import accountModel from '../models/account.model.js';
import ShortUniqueId from 'short-unique-id';
import sendMail from '../utils/mailer.js';
import getAccessToken from '../utils/generateAccessToken.js';


const registerUser = async (req,res)=>{

    if(!req.body)
    throw new ApiError(400,"Empty Request Body");

    const {username,email,mobileNumber,city,DOB,secretQuestion,secretAnswer,password} = req.body;

    if([username,email,city,DOB,secretQuestion,secretAnswer].some(val => val.trim()=== ""))
        throw new ApiError(400,'Empty Fields In Request Body');

    if(await userModel.findOne({email:email}))
        throw new ApiError(409,"User Is Already Registered");
    
    const nicFrontPicPath = req.files.nicFrontPic[0].path;
    const nicBackPicPath = req.files.nicBackPic[0].path;

    
    if(!nicFrontPicPath || !nicBackPicPath)
        throw new ApiError(400,"Both Sides of Nic Pictures Required");


     const nicFrontPic = await uploadFileOnCloudinary(nicFrontPicPath);   
     const nicBackPic = await uploadFileOnCloudinary(nicBackPicPath);

     if(!nicFrontPic || !nicBackPic)
        throw new ApiError(400,"Null values of nicFrontPic and nicBackPic")
    
      
     const createdUser = await userModel.create({
        username,
        email,
        mobileNumber,
        city,
        DOB: new Date(DOB),
        nicFrontPic,
        nicBackPic,
        secret:{
            question:secretQuestion,
            answer:secretAnswer
        }
     });

     if(!createdUser)
        throw new ApiError(500,"User has not been created in mongoDB");

     const accountId = new ShortUniqueId({length:8}).rnd();

    await accountModel.create({
        accountId,
        user:createdUser._id,
        password
    });

    const emailInfo = await sendMail({
     username: createdUser.username,
     accountId:accountId,
     password:password,
     email:createdUser.email
    },"Account Creation"
    );

    if(!emailInfo)
      throw new ApiError(500,"Error Occured in sending email");

    const user = await userModel.findById(createdUser._id).select("-secret");

     return res.status(200).json(new ApiResponse(200,user,"User has been registered successfully"));
}


const userLogin = async (req,res)=>{
if(!req.body)
    throw new ApiError(400,'Empty request body');

    const {accountId , password} = req.body;

    const user = await accountModel.findOne({accountId});

    if(!user)
        throw new ApiError(404,"User not found");

     const isPasswordCorrect = await user.isPasswordCorrect(password);
        console.log(isPasswordCorrect);
     if(!isPasswordCorrect)
        throw new ApiError(400,"Incorrect credentials");
            
        const loggedInUser = {accountId:user.accountId,user:user.user};
    
        const accessToken = await getAccessToken(loggedInUser);
        
    return res.status(200)
    .cookie("AccessToken",accessToken)
    .json(new ApiResponse(200,loggedInUser,"Access Token has been set and user has logged In"));

}



export {
    registerUser,
    userLogin
}


