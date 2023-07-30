import jwt from 'jsonwebtoken';
import key from '../config/secret';

const sign = async(user: {id: string, name: string,}) =>
{
    const payload = {
        id: user.id,
        name: user.name,
    };
    const option = {
        algorithm: process.env.SECRET_OPTION_ALGORITHM,
        expiresIn: process.env.SECRET_OPTION_EXPIRESIN,
        issuer: process.env.SECRET_OPTION_ISSUER
    }
    const response = {
        token: jwt.sign(payload, process.env.SECRET_KEY as string, option as any ),
    };
    return response;
};

const verify = async(token: any) => {
    let result;
    try{
        result = jwt.verify(token, key);
    }
    catch(err){
        console.error(err);
    };

    return result;
};

export default {sign, verify};