import { parseStringPromise } from 'xml2js';
import dataSource from '../config/dataSource.js';
import axios from 'axios';

const prfRepository = dataSource.getRepository('prf');
const API_KEY = process.env.API_KEY;

export const getPrfList = async () => {
	try {
		const prfList = await prfRepository.find();
		return prfList;
	} catch (err) {
		console.error(err);
	}
};

const loadData = async () => {
	try {
		const xmlData = await axios.get(
			`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=20230101&eddate=20251231&cpage=1&rows=10`
		);
		const result = await parseStringPromise(xmlData.data);
		const jsonData = result.dbs.db;
		console.log("jsonData : ", jsonData);
		return jsonData;
	} catch(err) {
		console.error(err);
	}
}

export const updateDB = async() => {
	try {
		const data = await loadData();
		for (const obj of data) {
			const isExist = await prfRepository.findOne({
				where: {prfId : obj.mt20id}
			});
			console.log("isHereExecuted?");
			if(isExist) {
				console.log(`${obj.prfnm} is already inserted`);
			} else {
				await prfRepository.insert({
					prfId: obj.mt20id,
					prfName: obj.prfnm,
					prfSdate: obj.prfpdfrom,
					prfEdate: obj.prfpdto,
					prfStage: obj.fcltynm,
					prfGenre: obj.genrenm,
				  });
			}
		}
	} catch(err) {
		console.error(err);
	}
}