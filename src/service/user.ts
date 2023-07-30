import {Request, Response} from 'express';
import dataSource from '../config/dataSource';
import jwt from './jwt';
import {User} from '../entity/User';

const login = async(userInfo: {id:string, password: string}) => {
    const {id, password} = userInfo;
    const user = await dataSource.manager.findOne(User, {where:{id:id}});
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
    if(await dataSource.manager.findOne(User, {where: {id:userInfo.id}})) return {success: false, msg: "existed id"};
    const newUser = await dataSource.manager.create(User, userInfo);
    dataSource.manager.save(newUser);
    return {success: true, msg: "register success"}

}

export default {login, register};