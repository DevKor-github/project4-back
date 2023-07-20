import {Request, Response} from 'express';
import dataSource from '../config/dataSource';
import jwt from './jwt';

const userData = dataSource.getRepository('user');
const login = async(userInfo: {id:string, password: string}) => {
    const id = userInfo.id;
    const password = userInfo.password;
    const user = await userData.findOne({where: {id:id}});
    if(!user) return {success: false, msg: "wrong id"};
    else{
        if(password===user.password){
            const jwtReq = {
                id: id,
                name: user.name,
            }
            const jwtResponse = await jwt.sign(jwtReq);
            return {success: true, msg: "login success", token: jwtResponse.token};
        }
        else return {success: false, msg: "wrong password"};
    }
}

const register = async(userInfo: {id:string, password: string, name: string}) => {
    const id = userInfo.id;
    const password = userInfo.password;
    const name =userInfo.name;
    if(await userData.findOne({where: {id:id}})) return {success: false, msg: "existed id"};
    else await userData.insert({id, password, name});
}

export default {login, register};