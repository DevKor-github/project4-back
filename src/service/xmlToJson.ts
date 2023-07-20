import axios from "axios";
import * as xml2js from "xml2js";
import { promisify } from "util";
//API에 get 요청해서 가져온 xml을 javascript 객체로 변환

const parser = new xml2js.Parser({ trim: true });
const parseStringPromise: any = promisify(parser.parseString); //여기 any로 지정해주지 않으면 에러.. 공부해보기

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

export default xmlToJson;
