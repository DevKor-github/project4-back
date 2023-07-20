import jwt from 'jsonwebtoken';
import key from '../config/secret';
const sign = async(user: {id: string, name: string,}) =>
{
    const payload = {
        id: user.id,
        name: user.name,
    };
    const response = {
        token: jwt.sign(payload, key, {
            algorithm: 'HS256',
            expiresIn: '60m',
            issuer: 'gongdol'
        }),
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