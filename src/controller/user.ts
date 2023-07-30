import {Request, Response, NextFunction} from 'express';
import User from '../service/user';

const login = async(req: Request, res: Response) => {
    const response = await User.login(req.body);
    return res.json(response);
}

const register = async(req:Request, res: Response) => {
    const response = await User.register(req.body);
    return res.json(response);
}
export default {login,register};