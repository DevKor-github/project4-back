import * as prfService from "../service/prfService.js";

export const getPrfList = async (req, res, next) => {
  try {
    const prfList = await prfService.getPrfList();
    res.status(200).json(prfList);
  } catch (err) {
    next(err);
  }
};

export const getSearchedPrfList = async (req, res, next) => {
  try {
    const prfName = req.query.prfName;
    const periodFrom = new Date(req.query.periodFrom || "2000-01-01");
    const periodTo = new Date(req.query.periodTo || "2099-12-31");
    const fcltyName = req.query.fcltyName;
    const prfGenre = req.query.prfGenre;
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

export const dbUpdate = async (req, res, next) => {
  try {
    await prfService.Update();
    res.status(200).send("Successfully Updated");
  } catch (err) {
    next(err);
  }
};
