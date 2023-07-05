import dataSource from "../config/dataSource.js";
import dotenv from "dotenv";
import axios from "axios";
import * as prfGetData from "../service/prfGetData.js";

dotenv.config();

const prfRepository = dataSource.getRepository("prf");

export const Update = async () => {
  try {
    //prfGetData 모듈에서 JSON으로 변환된 OpenAPI 데이터 가져오기
    const jsonStr = await prfGetData.xmlToJson();
    const jsonData = JSON.parse(jsonStr);

    for (const obj of jsonData) {
      //각 공연 obj에 대해서 업데이트 혹은 생성
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
        console.log(`prfID : ${obj.mt20id} is updated`);
      } else {
        //행이 없음. 생성.
        await prfRepository.insert({
          prfId: obj.mt20id,
          prfName: obj.prfnm,
          prfPeriodFrom: obj.prfpdfrom,
          prfPeriodTo: obj.prfpdto,
          fcltyName: obj.fcltynm,
          prfGenre: obj.genrenm,
        });
        console.log(`prfID : ${obj.mt20id} is inserted`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
