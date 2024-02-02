import accountModel from '../models/account.model.js';
import { ApiError } from '../utils/ApiError.js';
import verifyToken from '../utils/verifyAccessToken.js';

const verifyAccessToken = async (req,res,next)=>{
   try{
    const token = req.cookies.AccessToken;

    if(!token)
        throw new ApiError(401,"Unauthorized request");

    const verifiedToken = await verifyToken(token);

    if(!verifiedToken)
        throw new ApiError(400,"Token Authentication Failed");

      req.user=verifiedToken;
      
      next();

   }catch(err){
    console.log("INVALID ACCESS TOKEN")
    throw new ApiError(400,err);
  
}
    
    
};

export default verifyAccessToken;