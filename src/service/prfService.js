import dataSource from '../config/dataSource.js';
import { xml2js } from 'xml-js';
import axios from 'axios';

export const prfRepository = dataSource.getRepository('prf');
const API_KEY = process.env.API_KEY;

export const getPrfList = async () => {
	try {
		const prfList = await prfRepository.find();
		return prfList;
	} catch (err) {
		console.error(err);
	}
};

const url = "http://kopis.or.kr/openApi/restful/pblprfr/" ;

const insertPrf = async (data) => {
	try {
	  const result = await prfRepository.save({
		mt20id: data.mt20id,
		mt10id: data.mt10id,
		prfnm: data.prfnm,
		prfpdfrom: new Date(data.prfpdfrom),
		prfpdto: new Date(data.prfpdto),
		fcltynm: data.fcltynm,
		prfcast: data.prfcast,
		prfcrew: data.prfcrew,
		prfruntime: data.prfruntime,
		prfage: data.prfage,
		entrpsnm: data.entrpsnm,
		pcseguidance: data.pcseguidance,
		poster: data.poster,
		sty: data.sty,
		genrenm: data.genrenm,
		prfstate: data.prfstate,
		openrun: data.openrun,
		styurls: data.styurls,
		dtguidance: data.dtguidance,
	  });
  
	  console.log('well inserted:', result);
	} catch (error) {
	  console.error('fail to insert data:', error);
	}
  };

export const postData = async () => {
  try {
    const response = await axios.get(url+"PF132236?service="+API_KEY);
    const data = response.data.json();
	const dataJson = xml2js(data);
	insertPrf(dataJson);

  } catch (error) {
    console.error(error);
  }
};