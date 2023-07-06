import dataSource from '../config/dataSource.js';

const prfRepository = dataSource.getRepository('prf');

const insertPrf = async (prf) => {
	const id = prf.mt20id._text;
        const name = prf.prfnm._text;
		const prfpdfrom = prf.prfpdfrom._text;
		const prfpdto = prf.prfpdto._text;
		const price = prf.pcseguidance._text;
		const runtime = prf.prfruntime._text;
		const dtguidance = prf.dtguidance._text;
        if(prfRepository.findOne({where: { id: id },})) {//이미 저장되어 있으면 업데이트
            await prfRepository.update(
                {id},
                {
                    id,
                    name,
                    prfpdfrom,
                    prfpdto,
                    price,
                    runtime,
                    dtguidance,
                }
            );
        }
        else {
            await prfRepository.insert(
                {id},
                {
                    id,
                    name,
                    prfpdfrom,
                    prfpdto,
                    price,
                    runtime,
                    dtguidance,
                }
            );
        }
};

const getPrfList = async () => {
	try {
		const prfList = await prfRepository.find();
		return prfList;
	} catch (err) {
		console.error(err);
	}
};

export default {insertPrf, getPrfList, };