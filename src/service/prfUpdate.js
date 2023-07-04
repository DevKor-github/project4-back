import dataSource from "../config/dataSource.js";
import dotenv from "dotenv";
import axios from "axios";
import * as prfGetData from "../service/prfGetData.js";

dotenv.config();

const prfRepository = dataSource.getRepository("prf");

/*
const insertPrf = async (name) => {};

const findPrf = async (id) => {
  const exist = await prfRepository.findOne(id);

  if (exist) {
    //행이 존재. 업데이트.
    await prfRepository.update(
      { prfId: obj.mt20id },
      {
        prfName: obj.prfnm,
        prfPeriodFrom: obj.prfpdfrom,
        prfPeriodTo: obj.prfpdto,
        fcltyName: obj.fcltynm,
        prfGenre: obj.genrenm,
      }
    );
  } else {
    await prfRepository.insert({
      prfId: obj.mt20id,
      prfName: obj.prfnm,
      prfPeriodFrom: obj.prfpdfrom,
      prfPeriodTo: obj.prfpdto,
      fcltyName: obj.fcltynm,
      prfGenre: obj.genrenm,
    });
    //행이 없음. 생성.
  }
};
*/
export const Update = async () => {
  try {
    const jsonStr = await prfGetData.xmlToJson();
    const jsonData = JSON.parse(jsonStr);

    for (const obj of jsonData) {
      console.log(obj.mt20id);
      const exist = await prfRepository.findOne({
        where: { prfId: obj.mt20id },
      });

      if (exist) {
        //행이 존재. 업데이트.
        await prfRepository.update(
          { prfId: obj.mt20id },
          {
            prfName: obj.prfnm,
            prfPeriodFrom: obj.prfpdfrom,
            prfPeriodTo: obj.prfpdto,
            fcltyName: obj.fcltynm,
            prfGenre: obj.genrenm,
          }
        );
      } else {
        await prfRepository.insert({
          prfId: obj.mt20id,
          prfName: obj.prfnm,
          prfPeriodFrom: obj.prfpdfrom,
          prfPeriodTo: obj.prfpdto,
          fcltyName: obj.fcltynm,
          prfGenre: obj.genrenm,
        });
        //행이 없음. 생성.
      }
    }

    //res.status(200).xml(jsonData);
  } catch (err) {
    console.error(err);
  }
};
