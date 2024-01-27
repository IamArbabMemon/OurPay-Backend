import jwt from 'jsonwebtoken';

const getToken = async (userObject) =>{
    return await jwt.sign(userObject,process.env.ACCESS_TOKEN_SECRET);
};

export default getToken;