import * as prfService from "../service/prfService.js";
import * as prfGetData from "../service/prfGetData.js";
import * as prfUpdate from "../service/prfUpdate.js";

export const getPrfList = async (req, res, next) => {
  try {
    const prfList = await prfService.getPrfList();
    res.status(200).json(prfList);
  } catch (err) {
    next(err);
  }
};

export const printJson = async (req, res, next) => {
  try {
    const jsonStr = await prfGetData.xmlToJson();
    const jsonData = JSON.parse(jsonStr);
    res.status(200).json(jsonData);
    //res.status(200).xml(jsonData);
  } catch (err) {
    next(err);
  }
};

export const dbUpdate = async (req, res, next) => {
  try {
    await prfUpdate.Update();
  } catch (err) {
    next(err);
  }
};
