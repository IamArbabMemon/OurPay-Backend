import jwt from 'jsonwebtoken';

const verify = async (token) =>{
    return await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
};


export default verify;

