import dataSource from "../config/dataSource.js";
import axios from "axios";
import xml2js, { parseString } from "xml2js";
import { promisify } from "util";
import { LessThanOrEqual, MoreThanOrEqual, Like } from "typeorm";

const prfRepository = dataSource.getRepository("prfDetail");
const parser = new xml2js.Parser({ trim: true });
const parseStringPromise = promisify(parser.parseString);

export const getPrfList = async () => {
  try {
    const prfList = await prfRepository.find();
    return prfList;
  } catch (err) {
    console.error(err);
  }
};

const xmlToJson = async (URL) => {
  try {
    const xmlData = await axios.get(URL);
    //API에 get 요청해서 가져온 xml을 javascript 객체로 변환

    const result = await parseStringPromise(xmlData.data);
    const jsonData = result.dbs.db;
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};

export const Update = async () => {
  try {
    const updateURL = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=20230101&eddate=20251231&cpage=1&rows=10&shcate=CCCD%7CGGGA%7CAAAA&prfstate=01`;
    const jsonData = await xmlToJson(updateURL);

    console.log(jsonData);
    for (const obj of jsonData) {
      const exist = await prfRepository.findOne({
        where: { prfId: obj.mt20id },
      });

      if (exist) {
        //행이 존재. 넘어감.
        console.log(`prfID : ${obj.mt20id} is already inserted`);
      } else {
        console.log(obj.mt20id);
        const getDetailURL = `http://www.kopis.or.kr/openApi/restful/pblprfr/${obj.mt20id}?service=${process.env.API_KEY}`;
        const jsonDetailData = await xmlToJson(getDetailURL);
        console.log(jsonDetailData);
        //행이 없음. 생성.
        await prfRepository.insert({
          prfId: jsonDetailData[0].mt20id,
          fcltyId: jsonDetailData[0].mt10id,
          prfName: jsonDetailData[0].prfnm,
          fcltyName: jsonDetailData[0].fcltynm,
          prfPeriodFrom: jsonDetailData[0].prfpdfrom,
          prfPeriodTo: jsonDetailData[0].prfpdto,
          prfCast: jsonDetailData[0].prfcast,
          prfRuntime: jsonDetailData[0].prfruntime,
          prfAge: jsonDetailData[0].prfage,
          prfPrice: jsonDetailData[0].pcseguidance,
          prfGenre: jsonDetailData[0].genrenm,
          prfState: jsonDetailData[0].prfstate,
          prfPoster: jsonDetailData[0].poster,
        });
        console.log(`prfID : ${obj.mt20id} is inserted`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSearchedPrfList = async (
  prfName,
  periodFrom,
  periodTo,
  fcltyName,
  prfGenre
) => {
  try {
    const prfList = await prfRepository.findBy({
      prfName: Like(`%${prfName}%`),
      prfPeriodFrom: MoreThanOrEqual(periodFrom),
      prfPeriodTo: LessThanOrEqual(periodTo),
      fcltyName: Like(`%${fcltyName}%`),
      prfGenre: Like(`%${prfGenre}%`),
    }); //GET queryString으로 공연 이름, 기간, 장소 설정하여 search
    return prfList;
  } catch (err) {
    console.error(err);
  }
};
