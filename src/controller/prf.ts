import * as prfService from "../service/prfService.js";
import { Request, Response, NextFunction } from "express";
export const getPrfList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prfList = await prfService.getPrfList();
    res.status(200).json(prfList);
  } catch (err) {
    next(err);
  }
};

interface queryParams {
  prfName: string;
  periodFrom: string;
  periodTo: string;
  fcltyName: string;
  prfGenre: string;
}

export const getSearchedPrfList = async (
  req: Request<{}, {}, {}, queryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const prfName: string = req.query.prfName;
    const periodFrom: Date = new Date(req.query.periodFrom || "2000-01-01");
    const periodTo: Date = new Date(req.query.periodTo || "2099-12-31");
    const fcltyName: string = req.query.fcltyName;
    const prfGenre: string = req.query.prfGenre;
    const prfList = await prfService.getSearchedPrfList(
      prfName,
      periodFrom,
      periodTo,
      fcltyName,
      prfGenre
    );
    res.status(200).json(prfList);
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
    await prfService.Update();
    res.status(200).send("Successfully Updated");
  } catch (err) {
    next(err);
  }
};
