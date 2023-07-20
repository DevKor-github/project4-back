import dataSource from '../config/dataSource.js';
import { loadData } from './api.js';

const prfRepository = dataSource.getRepository('prf');

interface PrfData {
	mt20id: string;
	prfnm: string;
	prfpdfrom: Date;
	prfpdto: Date;
	fcltynm: string;
	genrenm: string;
}

export const updateDB = async () => {
	try {
		const data: PrfData[] = await loadData();
		for (const obj of data) {
			const isExist = await prfRepository.findOne({
				where: { prfId: obj.mt20id }
			});
			if (isExist) {
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
	} catch (error) {
		console.error(error);
	}
}

