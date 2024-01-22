import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME } from '../constants';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
  });

export const uploadFileOnCloudinary = async (localfilePath)=>{
    if(!localfilePath)
        return null;

        try{
        const response = await cloudinary.uploader.upload(localfilePath,{ resource_type: "auto" });
        fs.unlinkSync(localfilePath);
        return response.url;
       
         }catch(error){
            fs.unlinkSync(localfilePath);
            console.log(error)
            return null;
        }

}

