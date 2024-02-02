import accountModel from "../models/account.model";
import { ApiError} from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const checkBalance = async (req,res)=>{
try{
    if(!req.body)
    throw new ApiError(400,"Unauthorized User");

    const accountId = req.body.user?.accountId;

    if(!accountId)
        throw new ApiError(404,"Account Id not found in request");

      const user = await accountModel.findOne({accountId});  

      if(!user)
        throw new ApiError(404,"User not found");

      const balance = user.balance;  

    return res.status(200).json(new ApiResponse(200,{accountId:accountId,balance:balance},"Current balance of user"));

}catch(err){
    console.log(err);
}

};


const depositAmount = async (req,res)=>{
   try{

    if(!req.body)
    throw new ApiError(400,"Unauthorized User");

    const accountId = req.body.user?.accountId;
    
    const amountTobeAdded = req.body.amount;

    if(!amountTobeAdded)
        throw new ApiError(400,"Please insert to amount to be deposited");

    if(!accountId)
        throw new ApiError(404,"Account Id not found in request");

      const user = await accountModel.findOne({accountId});  

      if(!user)
        throw new ApiError(404,"User not found");


      user.balance = user.balance+amount;
      user.save();
      
    return res.status(200).json(new ApiResponse(200,{accountId:accountId,balance:user.balance},"Balance Has been updated"));


   }catch(err){
    console.log(err);
   }     


};


const withdraw = async ()=>{
    try{

    }catch(err){
        
    }
}



export {
    checkBalance,
    depositAmount
}