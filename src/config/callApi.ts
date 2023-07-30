import express from 'express';
import axios from 'axios';
import converter from 'xml-js';

const router = express.Router();

const callApi = async (prfid: string, dtfrom: string, dtto: string) => {
  const url = `https://kopis.or.kr/openApi/restful/pblprfr/${prfid}?service=${process.env.KEY_API}&stdate=${dtfrom}&eddate=${dtto}&rows=10&cpage=1`;
  const { data } = await axios.get(url);
  const jsonData:any = converter.xml2js(data, { compact: true });
  return jsonData.dbs.db;
};

export default callApi;