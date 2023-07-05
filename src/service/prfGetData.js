import dataSource from "../config/dataSource.js";
import dotenv from "dotenv";
import axios from "axios";
import xml2js, { parseString } from "xml2js";
import { promisify } from "util";

dotenv.config();

const parser = new xml2js.Parser({ trim: true });
const parseStringPromise = promisify(parser.parseString);

export const xmlToJson = async () => {
  try {
    const xmlData = await axios.get(
      `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=20230101&eddate=20231231&cpage=1&rows=2000&shcate=CCCD`
    );
    //대중음악 장르의 2023년 공연 10개를 가져와서 업데이트(추후 수정)

    const result = await parseStringPromise(xmlData.data);
    const jsonData = result.dbs.db;
    const jsonStr = JSON.stringify(result.dbs.db, null, 4);

    //console.log(jsonStr);
    return jsonStr;
  } catch (err) {
    console.error(err);
  }
};
