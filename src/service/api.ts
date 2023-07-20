import { parseStringPromise } from 'xml2js';
import dataSource from '../config/dataSource.js';
import axios from 'axios';

const prfRepository = dataSource.getRepository('prf');
const API_KEY = process.env.API_KEY;

export const loadData = async () => {
    try {
        const xmlData = await axios.get(
            `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=20230101&eddate=20251231&cpage=1&rows=10`
        );
        const result = await parseStringPromise(xmlData.data);
        const jsonData = result.dbs.db;
        return jsonData;
    } catch (error) {
        console.error(error);
    }
}