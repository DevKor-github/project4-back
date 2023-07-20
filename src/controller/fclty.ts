import * as fcltyService from "../service/fcltyService.js";
import { Request, Response, NextFunction } from "express";
export const getFcltyList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fcltyList = await fcltyService.getFcltyList();
    res.status(200).json(fcltyList);
  } catch (err) {
    next(err);
  }
};

interface queryParams {
  fcltyName: string;
}

export const getSearchedFcltyList = async (
  req: Request<{}, {}, {}, queryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const fcltyName: string = req.query.fcltyName;
    const fcltyList = await fcltyService.getSearchedFcltyList(fcltyName);
    res.status(200).json(fcltyList);
  } catch (err) {
    next(err);
  }
};

export const dbUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await fcltyService.Update();
    res.status(200).send("Successfully Updated");
  } catch (err) {
    next(err);
  }
};
