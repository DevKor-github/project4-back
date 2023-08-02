import dataSource from "../config/dataSource";
import { Like } from "typeorm";
import * as schedule from "node-schedule";
import xmlToJson from "./xmlToJson";
import { Fclty } from "../entity/fclty";

const fcltyRepository = dataSource.getRepository(Fclty);

//모든 리스트 가져오기
export const getFcltyList = async () => {
  try {
    const fcltyList: Array<Fclty> = await fcltyRepository.find();
    return fcltyList;
  } catch (err) {
    console.error(err);
  }
};

export const Update = async () => {
  try {
    const updateURL: string = `http://www.kopis.or.kr/openApi/restful/prfplc?service=${process.env.API_KEY}&cpage=1&rows=3000`;
    const jsonData = await xmlToJson(updateURL);

    console.log(jsonData);
    for (const obj of jsonData) {
      const exist = await fcltyRepository.findOne({
        where: { fcltyId: obj.mt10id },
      });

      if (exist) {
        //행이 존재. 넘어감.
        console.log(`fcltyId : ${obj.mt10id} is already inserted`);
      } else {
        console.log(obj.mt10id);
        const getDetailURL: string = `http://www.kopis.or.kr/openApi/restful/prfplc/${obj.mt10id}?service=${process.env.API_KEY}`;
        const jsonDetailData = await xmlToJson(getDetailURL);
        console.log(jsonDetailData);
        //행이 없음. 생성.
        await fcltyRepository.insert({
          fcltyId: jsonDetailData[0].mt10id[0],
          fcltyName: jsonDetailData[0].fcltynm[0],
          fcltySeatscale: jsonDetailData[0].seatscale[0],
          fcltyTel: jsonDetailData[0].telno[0],
          fcltyUrl: jsonDetailData[0].relateurl[0],
          fcltyAdr: jsonDetailData[0].adres[0],
          fcltyla: jsonDetailData[0].la[0],
          fcltylo: jsonDetailData[0].lo[0],
        });
        console.log(`fcltyID : ${obj.mt10id} is inserted`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

//node-schedule단. 화요일 23시 50분 자동 업데이트.
const automaticUpdate = new schedule.RecurrenceRule();
automaticUpdate.dayOfWeek = 2;
automaticUpdate.hour = 23;
automaticUpdate.minute = 50;
automaticUpdate.tz = "Asia/Seoul";

schedule.scheduleJob(automaticUpdate, () => {
  Update();
});

//이름, 기간, 시설, 장르로 검색
export const getSearchedFcltyList = async (fcltyName: string) => {
  try {
    const fcltyList: any = await fcltyRepository.findBy({
      fcltyName: Like(`%${fcltyName}%`),
    }); //GET queryString으로 공연 이름, 기간, 장소 설정하여 search
    return fcltyList;
  } catch (err) {
    console.error(err);
  }
};
