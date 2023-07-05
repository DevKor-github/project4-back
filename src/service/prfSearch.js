import { LessThanOrEqual, MoreThanOrEqual, Like } from "typeorm";
import dataSource from "../config/dataSource.js";

const prfRepository = dataSource.getRepository("prf");

export const getSearchedPrfList = async (
  prfName,
  periodFrom,
  periodTo,
  fcltyName
) => {
  try {
    const prfList = await prfRepository.findBy({
      prfName: Like(`%${prfName}%`),
      prfPeriodFrom: MoreThanOrEqual(periodFrom),
      prfPeriodTo: LessThanOrEqual(periodTo),
      fcltyName: Like(`%${fcltyName}%`),
    }); //GET queryString으로 공연 이름, 기간, 장소 설정하여 search
    return prfList;
  } catch (err) {
    console.error(err);
  }
};
