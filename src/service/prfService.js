import dataSource from '../config/dataSource.js';
import axios from 'axios';

const prfRepository = dataSource.getRepository('prf');

const insertPrf = async (name) => {};

export const getPrfList = async () => {
	try {
		const prfList = await prfRepository.find();
		return prfList;
	} catch (err) {
		console.error(err);
	}
};

const url = "http://kopis.or.kr/openApi/restful/pblprfr/" ;
const API_KEY="44173fd6cde14917b6597c62b6675604";


const fetchData = async () => {
  try {
    const response = await axios.get(url+API_KEY);
    const data = response.data;
    
    const prfStorage = dataSource.getRepository('prf')

	for (const item of data) {
		const prf = new prf();
		prf.mt20id = item.mt20id;
		prf.mt10id = item.mt10id;
		prf.prfnm = item.prfnm;
		prf.prfpdfrom = item.prfpdfrom;
		prf.prfpdto = item.prfpdto;
		prf.fcltynm = item.fcltynm;
		prf.prfcast = item.prfcast;
		prf.prfcrew = item.prfcrew;
		prf.prfruntime = item.prfruntime;
		prf.prfage = item.prfage;
		prf.entrpsnm = item.entrpsnm;
		prf.pcseguidance = item.pcseguidance;
		prf.poster = item.poster;
		prf.sty = item.sty;
		prf.genrenm = item.genrenm;
		prf.prfstate = item.prfstate;
		prf.openrun = item.openrun;
		prf.styurls = item.styurls;
		prf.dtguidance = item.dtguidance;

		await prfStorage.save(prf)
	}

  } catch (error) {
    console.error(error);
  }
};