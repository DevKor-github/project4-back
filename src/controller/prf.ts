import * as prfService from "../service/prfService.js";

export const getPrfList: any = async (req: any, res: any, next: any) => {
  try {
    const prfList: any = await prfService.getPrfList();
    res.status(200).json(prfList);
  } catch (err) {
    next(err);
  }
};

export const getSearchedPrfList: any = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const prfName: any = req.query.prfName;
    const periodFrom: any = new Date(req.query.periodFrom || "2000-01-01");
    const periodTo: any = new Date(req.query.periodTo || "2099-12-31");
    const fcltyName: any = req.query.fcltyName;
    const prfGenre: any = req.query.prfGenre;
    const prfList: any = await prfService.getSearchedPrfList(
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

export const dbUpdate = async (req: any, res: any, next: any) => {
  try {
    await prfService.Update();
    res.status(200).send("Successfully Updated");
  } catch (err) {
    next(err);
  }
};
