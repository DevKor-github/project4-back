import * as prfService from "../service/prfService.js";
import * as prfGetData from "../service/prfGetData.js";
import * as prfUpdate from "../service/prfUpdate.js";
import * as prfSearch from "../service/prfSearch.js";

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
    const prfList = await prfSearch.getSearchedPrfList(
      prfName,
      periodFrom,
      periodTo,
      fcltyName
    );
    res.status(200).json(prfList);
  } catch (err) {
    next(err);
  }
};

export const dbUpdate = async (req, res, next) => {
  try {
    await prfUpdate.Update();
    res.status(200).send("Successfully Updated");
  } catch (err) {
    next(err);
  }
};
