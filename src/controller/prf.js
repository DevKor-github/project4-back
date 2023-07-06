import * as prfService from '../service/prfService.js';
// import * as api from '../service/api.js';

export const getPrfList = async (req, res, next) => {
	try {
		const prfList = await prfService.getPrfList();
		res.status(200).json(prfList);
	} catch (err) {
		next(err);
	}
};

export const postData = async (req,res,next) => {
	try {
		await api.postData();
	} catch (err) {
		next(err);
	}
}
