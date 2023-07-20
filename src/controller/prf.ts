import prfService from '../service/prfService';
import { Request, Response, NextFunction } from 'express';

export const getPrfList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prfList = await prfService.getPrfList();
    res.status(200).json(prfList);
  } catch (err) {
    next(err);
  }
};