import dataSource from "../config/dataSource.js";
import axios from "axios";
import * as xml2js from "xml2js";
import { promisify } from "util";
import { LessThanOrEqual, MoreThanOrEqual, Like } from "typeorm";
import * as schedule from "node-schedule";

const prfRepository = dataSource.getRepository("prf");
const parser = new xml2js.Parser({ trim: true });
const parseStringPromise: any = promisify(parser.parseString); //여기 any로 지정해주지 않으면 에러.. 공부해보기

//모든 리스트 가져오기
export const getPrfList = async () => {
  try {
    const prfList: any = await prfRepository.find();
    return prfList;
  } catch (err) {
    console.error(err);
  }
};

//API에 get 요청해서 가져온 xml을 javascript 객체로 변환
const xmlToJson = async (URL: string) => {
  try {
    const xmlData = await axios.get(URL);

    const result = await parseStringPromise(xmlData.data);
    const jsonData = result.dbs.db;
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};

export const Update = async () => {
  try {
    const updateURL: string = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=20230101&eddate=20251231&cpage=1&rows=10&shcate=CCCD%7CGGGA%7CAAAA&prfstate=01`;
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
        const getDetailURL: string = `http://www.kopis.or.kr/openApi/restful/pblprfr/${obj.mt20id}?service=${process.env.API_KEY}`;
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

//node-schedule단. 수요일 0시 0분 자동 업데이트.
const automaticUpdate = new schedule.RecurrenceRule();
automaticUpdate.dayOfWeek = 3;
automaticUpdate.hour = 0;
automaticUpdate.minute = 0;
automaticUpdate.tz = "Asia/Seoul";

schedule.scheduleJob(automaticUpdate, () => {
  Update();
});

//이름, 기간, 시설, 장르로 검색
export const getSearchedPrfList = async (
  prfName: string,
  periodFrom: Date,
  periodTo: Date,
  fcltyName: string,
  prfGenre: string
) => {
  try {
    const prfList: any = await prfRepository.findBy({
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
