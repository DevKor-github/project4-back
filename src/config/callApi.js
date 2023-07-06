import express from 'express';
import request from 'request';
import converter from 'xml-js';
import axios from "axios";

const router = express.Router();

const callApi = async(prfid, dtfrom, dtto) => {//공연 아이디와 검색할 날짜를 입력받아 API 요청
    const url = `https://kopis.or.kr/openApi/restful/pblprfr/${prfid}?service=${process.env.KEY_API}&stdate=${dtfrom}&eddate=${dtto}&rows=10&cpage=1`
    const data = await axios.get(url);
    const jsonData = converter.xml2js(data.data, {compact: true});
    return jsonData.dbs.db;
};

export default callApi;